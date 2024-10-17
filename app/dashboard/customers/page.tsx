import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Page() {
  const customers = await prisma.customers.findMany();

  const customersList = customers.map(customer => (
    <li key={customer.id} className="p-2 hover:bg-gray-100">
      {customer.name} • {customer.email}
    </li>
  ));

  return (
    <ul className="rounded-md border p-2">
      {customersList.map((customer) => customer)}
    </ul>
  );
}
