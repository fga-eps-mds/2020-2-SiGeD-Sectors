const validate = (name, description) => {
  const errors = [];

  if (!name) {
    errors.push('invalid name');
  }

  if (!description) {
    errors.push('invalid description');
  }

  return errors;
};

module.exports = { validate };
