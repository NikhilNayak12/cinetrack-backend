export const buildProjectSearchQuery = (query) => {
  const filter = {};

  // 🔍 search by title (case insensitive)
  if (query.search) {
    filter.title = {
      $regex: query.search,
      $options: "i"
    };
  }

  // 🎭 filter by genre
  if (query.genre) {
    filter.genre = query.genre;
  }

  // 📊 filter by status
  if (query.status) {
    filter.status = query.status;
  }

  return filter;
};

export const buildTaskSearchQuery = (query, userId) => {
  const filter = { assignedTo: userId };

  // 📊 filter by status
  if (query.status) {
    filter.status = query.status;
  }

  return filter;
};