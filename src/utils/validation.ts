// Validation utility for form and data validation
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  url?: boolean;
  custom?: (value: any) => string | null;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface FieldValidation {
  [fieldName: string]: ValidationRule;
}

// Common validation patterns
export const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  url: /^https?:\/\/.+/,
  phone: /^\+?[\d\s\-\(\)]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  username: /^[a-zA-Z0-9_]{3,20}$/,
};

// Validation functions
export const validateField = (value: any, rules: ValidationRule): ValidationResult => {
  const errors: string[] = [];

  // Required validation
  if (rules.required && (!value || (typeof value === 'string' && !value.trim()))) {
    errors.push('This field is required');
    return { isValid: false, errors };
  }

  // Skip other validations if value is empty and not required
  if (!value || (typeof value === 'string' && !value.trim())) {
    return { isValid: true, errors: [] };
  }

  // Length validations
  if (typeof value === 'string') {
    if (rules.minLength && value.length < rules.minLength) {
      errors.push(`Minimum length is ${rules.minLength} characters`);
    }
    if (rules.maxLength && value.length > rules.maxLength) {
      errors.push(`Maximum length is ${rules.maxLength} characters`);
    }
  }

  // Pattern validation
  if (rules.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
    errors.push('Invalid format');
  }

  // Email validation
  if (rules.email && typeof value === 'string' && !patterns.email.test(value)) {
    errors.push('Please enter a valid email address');
  }

  // URL validation
  if (rules.url && typeof value === 'string' && !patterns.url.test(value)) {
    errors.push('Please enter a valid URL');
  }

  // Custom validation
  if (rules.custom) {
    const customError = rules.custom(value);
    if (customError) {
      errors.push(customError);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Validate entire form
export const validateForm = (data: any, validationSchema: FieldValidation): ValidationResult => {
  const errors: string[] = [];
  let isValid = true;

  Object.keys(validationSchema).forEach(fieldName => {
    const fieldValue = data[fieldName];
    const fieldRules = validationSchema[fieldName];
    const fieldValidation = validateField(fieldValue, fieldRules);

    if (!fieldValidation.isValid) {
      isValid = false;
      errors.push(...fieldValidation.errors.map(error => `${fieldName}: ${error}`));
    }
  });

  return { isValid, errors };
};

// Predefined validation schemas
export const validationSchemas = {
  // User registration
  userRegistration: {
    email: {
      required: true,
      email: true,
    },
    password: {
      required: true,
      minLength: 8,
      pattern: patterns.password,
      custom: (value: string) => {
        if (!/(?=.*[a-z])/.test(value)) return 'Password must contain at least one lowercase letter';
        if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain at least one uppercase letter';
        if (!/(?=.*\d)/.test(value)) return 'Password must contain at least one number';
        return null;
      },
    },
    confirmPassword: {
      required: true,
      custom: (value: string, formData?: any) => {
        if (formData && value !== formData.password) {
          return 'Passwords do not match';
        }
        return null;
      },
    },
    fullName: {
      required: true,
      minLength: 2,
      maxLength: 100,
    },
  },

  // Academic paper
  academicPaper: {
    title: {
      required: true,
      minLength: 5,
      maxLength: 500,
    },
    abstract: {
      required: true,
      minLength: 50,
      maxLength: 2000,
    },
    authors: {
      required: true,
      custom: (value: string[]) => {
        if (!Array.isArray(value) || value.length === 0) {
          return 'At least one author is required';
        }
        if (value.some(author => !author.trim())) {
          return 'All authors must have valid names';
        }
        return null;
      },
    },
    keywords: {
      required: true,
      custom: (value: string[]) => {
        if (!Array.isArray(value) || value.length === 0) {
          return 'At least one keyword is required';
        }
        if (value.some(keyword => !keyword.trim())) {
          return 'All keywords must be valid';
        }
        return null;
      },
    },
    journal: {
      maxLength: 200,
    },
    doi: {
      custom: (value: string) => {
        if (value && !/^10\.\d{4,}\/[-._;()\/:A-Z0-9]+$/i.test(value)) {
          return 'Please enter a valid DOI';
        }
        return null;
      },
    },
  },

  // Profile update
  profileUpdate: {
    fullName: {
      required: true,
      minLength: 2,
      maxLength: 100,
    },
    avatarUrl: {
      url: true,
    },
  },
};

// Utility functions for common validations
export const validators = {
  // Email validation
  isEmail: (value: string): boolean => {
    return patterns.email.test(value);
  },

  // Password strength validation
  isStrongPassword: (value: string): boolean => {
    return patterns.password.test(value);
  },

  // URL validation
  isUrl: (value: string): boolean => {
    return patterns.url.test(value);
  },

  // Phone number validation
  isPhoneNumber: (value: string): boolean => {
    return patterns.phone.test(value);
  },

  // Username validation
  isUsername: (value: string): boolean => {
    return patterns.username.test(value);
  },

  // Array validation
  isNonEmptyArray: (value: any): boolean => {
    return Array.isArray(value) && value.length > 0;
  },

  // Object validation
  isNonEmptyObject: (value: any): boolean => {
    return typeof value === 'object' && value !== null && Object.keys(value).length > 0;
  },

  // File validation
  isValidFile: (file: File, options?: {
    maxSize?: number; // in bytes
    allowedTypes?: string[];
  }): boolean => {
    if (!file) return false;

    if (options?.maxSize && file.size > options.maxSize) {
      return false;
    }

    if (options?.allowedTypes && !options.allowedTypes.includes(file.type)) {
      return false;
    }

    return true;
  },
};

// Error message helpers
export const getErrorMessage = (fieldName: string, errorType: string): string => {
  const messages: Record<string, Record<string, string>> = {
    email: {
      required: 'Email is required',
      invalid: 'Please enter a valid email address',
    },
    password: {
      required: 'Password is required',
      tooShort: 'Password must be at least 8 characters long',
      tooWeak: 'Password must contain uppercase, lowercase, and number',
    },
    title: {
      required: 'Title is required',
      tooShort: 'Title must be at least 5 characters long',
      tooLong: 'Title must be less than 500 characters',
    },
    abstract: {
      required: 'Abstract is required',
      tooShort: 'Abstract must be at least 50 characters long',
      tooLong: 'Abstract must be less than 2000 characters',
    },
  };

  return messages[fieldName]?.[errorType] || `${fieldName} is invalid`;
}; 