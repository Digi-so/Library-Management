
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create genres
  const genres = await Promise.all([
    prisma.genre.upsert({
      where: { name: 'Fiction' },
      update: {},
      create: { name: 'Fiction' },
    }),
    prisma.genre.upsert({
      where: { name: 'Science' },
      update: {},
      create: { name: 'Science' },
    }),
    prisma.genre.upsert({
      where: { name: 'History' },
      update: {},
      create: { name: 'History' },
    }),
    prisma.genre.upsert({
      where: { name: 'Technology' },
      update: {},
      create: { name: 'Technology' },
    }),
  ]);

  const books = [
    ['The Great Gatsby', 'F. Scott Fitzgerald', '9780743273565', 'Fiction'],
    ['Things Fall Apart', 'Chinua Achebe', '9780385474542', 'Fiction'],
    ['Pride and Prejudice', 'Jane Austen', '9780141439518', 'Fiction'],
    ['1984', 'George Orwell', '9780451524935', 'Fiction'],

    ['A Brief History of Time', 'Stephen Hawking', '9780553380163', 'Science'],
    ['Cosmos', 'Carl Sagan', '9780345539434', 'Science'],
    ['The Selfish Gene', 'Richard Dawkins', '9780198788607', 'Science'],
    ['The Origin of Species', 'Charles Darwin', '9781509827695', 'Science'],

    ['The Diary of a Young Girl', 'Anne Frank', '9780553296983', 'History'],
    ['Sapiens', 'Yuval Noah Harari', '9780062316097', 'History'],
    ['The Art of War', 'Sun Tzu', '9781590302255', 'History'],
    ['Long Walk to Freedom', 'Nelson Mandela', '9780316548182', 'History'],

    ['Clean Code', 'Robert C. Martin', '9780132350884', 'Technology'],
    ['The Pragmatic Programmer', 'Andrew Hunt', '9780135957059', 'Technology'],
    ['Introduction to Algorithms', 'Thomas H. Cormen', '9780262046305', 'Technology'],
    ['The Innovators', 'Walter Isaacson', '9781476708690', 'Technology'],
  ];

  for (const [title, author, isbn, genreName] of books) {
    const genre = genres.find((g) => g.name === genreName);

    if (!genre) {
      throw new Error(`Genre not found: ${genreName}`);
    }

    await prisma.book.upsert({
      where: { isbn },
      update: {},
      create: {
        title,
        author,
        isbn,
        genreId: genre.id,
      },
    });
  }

  console.log('Successfully seeded 4 genres and 16 books!');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
