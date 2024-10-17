import { PrismaClient } from '@prisma/client';
import { clsx } from "clsx";

const prisma = new PrismaClient();

export default async function Page() {
  const invoices = await prisma.invoices.findMany();

  const invoicesList = invoices.map(async invoice => {
    const customer = await prisma.customers.findUnique(
      {
        where: {
          id: invoice.customer_id,
        }
      }
    );

    return (
      <li key={invoice.id} className="p-2 hover:bg-gray-100">
        <p>
          <strong className={'text-blue-800'}>Status: </strong>
          <span className={clsx(
            {
              'text-orange-400': invoice.status === 'pending',
              'text-green-500': invoice.status === 'paid',
            }
          )}>{invoice.status}</span>
        </p>
        <p>
          <strong className={'text-blue-800'}>Amount:</strong> <strong className={'text-green-700'}>$</strong>{invoice.amount}
        </p>
        <p>
          <strong className={'text-blue-800'}>Customer:</strong> {(customer != null) ? '' + customer.name : ''}
        </p>
      </li>
    );
  });

  return (
    <ul className="rounded-md border p-2">
      {invoicesList.map((invoice) => invoice)}
    </ul>
  );
}
