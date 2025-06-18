export const firstNameRules = {
  required: { value: true, message: 'First Name is required' },
  maxLength: { value: 20, message: 'Max 20 characters allowed' },
  pattern: {
    value: /^[A-Z][a-z]+$/,
    message: 'First letter should be capital and no space in between',
  },
};

export const lastNameRules = {
  required: { value: true, message: 'Last Name is required' },
  maxLength: { value: 20, message: 'Max 20 characters allowed' },
  pattern: {
    value: /^[A-Z][a-z]+$/,
    message: 'First letter should be capital and no space in between',
  },
};

export const emailAddressRules = {
  requires: { value: true, message: 'Email is required' },
  pattern: {
    value: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim,
    message: 'Invalid email format',
  },
};

export const dateOfJoiningRules = {
  required: {
    value: true,
    message: 'Date of Joining is required',
  },
  pattern: {
    value: /^(19\d{2}|2\d{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/,
    message: 'Date should be in YYYY/MM/DD',
  },
};
