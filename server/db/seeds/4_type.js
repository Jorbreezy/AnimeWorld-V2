exports.seed = (knex) => (
  // Deletes ALL existing entries
  knex('type').del()
    .then(() => knex('type')
      .insert([
        { id: 1, type: 'Manga' },
        { id: 2, type: 'Webtoon' },
        { id: 3, type: 'Manhua' },
      ])));
