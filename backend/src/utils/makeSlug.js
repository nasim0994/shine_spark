const makeSlug = (name) => {
  return name
    .toLowerCase() // Convert to lowercase
    .replace(/[^\w\s-]/g, "") // Remove special characters except words, space, and hyphen
    .trim() // Trim spaces from both ends
    .replace(/\s+/g, "-") // Replace spaces with hyphen
    .replace(/-+/g, "-"); // Remove multiple hyphens
};

module.exports = makeSlug;
