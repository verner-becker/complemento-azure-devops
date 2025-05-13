// Base API functions for making HTTP requests and error handling
const API_BASE_URL = '/api';

/**
 * Generic API call function with error handling
 * @param {string} endpoint - API endpoint to call
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {object} body - Request body for POST/PUT requests
 * @param {object} options - Additional fetch options
 * @returns {Promise} - Resolves with the response data or null if error
 */
async function apiCall(endpoint, method = 'GET', body = null, options = {}) {
    try {
        const fetchOptions = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        if (body) {
            fetchOptions.body = JSON.stringify(body);
        }

        const response = await fetch(`${API_BASE_URL}/${endpoint}`, fetchOptions);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new APIError(response.status, response.statusText, errorData);
        }

        // For DELETE requests, return success boolean
        if (method === 'DELETE') {
            return true;
        }

        // For other methods, parse and return the response data
        return await response.json();
    } catch (error) {
        handleAPIError(error);
        return null;
    }
}

/**
 * Custom API Error class for better error handling
 */
class APIError extends Error {
    constructor(status, statusText, data = {}) {
        super(data.message || statusText);
        this.name = 'APIError';
        this.status = status;
        this.statusText = statusText;
        this.data = data;
    }
}

/**
 * Centralized error handling for API calls
 * @param {Error} error - The error object
 */
function handleAPIError(error) {
    console.error('API Error:', error);
    
    let message = 'Ocorreu um erro ao comunicar com o servidor.';
    
    if (error instanceof APIError) {
        switch (error.status) {
            case 400:
                message = 'Dados inválidos. Verifique os campos e tente novamente.';
                break;
            case 401:
                message = 'Não autorizado. Faça login novamente.';
                break;
            case 403:
                message = 'Acesso negado.';
                break;
            case 404:
                message = 'Recurso não encontrado.';
                break;
            case 422:
                message = error.data.message || 'Dados inválidos para processamento.';
                break;
            case 500:
                message = 'Erro interno do servidor. Tente novamente mais tarde.';
                break;
            default:
                message = error.message || message;
        }
    }

    // Show error to user (implementation will depend on UI components)
    showErrorMessage(message);
}

/**
 * Show error message to user
 * @param {string} message - Error message to display
 */
function showErrorMessage(message) {
    // This is a placeholder - actual implementation will depend on UI components
    console.error('Error:', message);
    // TODO: Implement actual error display mechanism (toast, alert, etc.)
}

/**
 * DOM manipulation utilities
 */
const DOM = {
    /**
     * Show an element
     * @param {HTMLElement|string} element - Element or element ID
     */
    show(element) {
        const el = typeof element === 'string' ? document.getElementById(element) : element;
        if (el) {
            el.style.display = '';
        }
    },

    /**
     * Hide an element
     * @param {HTMLElement|string} element - Element or element ID
     */
    hide(element) {
        const el = typeof element === 'string' ? document.getElementById(element) : element;
        if (el) {
            el.style.display = 'none';
        }
    },

    /**
     * Create a DOM element with attributes and properties
     * @param {string} tag - HTML tag name
     * @param {object} props - Element properties and attributes
     * @param {Array|Element} children - Child elements or text content
     * @returns {HTMLElement} - The created element
     */
    create(tag, props = {}, children = []) {
        const element = document.createElement(tag);
        
        // Set properties and attributes
        Object.entries(props).forEach(([key, value]) => {
            if (key === 'style' && typeof value === 'object') {
                Object.assign(element.style, value);
            } else if (key === 'className') {
                element.className = value;
            } else if (key.startsWith('on') && typeof value === 'function') {
                element.addEventListener(key.slice(2).toLowerCase(), value);
            } else {
                element.setAttribute(key, value);
            }
        });

        // Add children
        if (typeof children === 'string') {
            element.textContent = children;
        } else {
            [].concat(children).forEach(child => {
                if (child) {
                    element.appendChild(
                        typeof child === 'string' ? document.createTextNode(child) : child
                    );
                }
            });
        }

        return element;
    }
};

/**
 * Form validation utilities
 */
const FormValidation = {
    /**
     * Validate required fields in a form
     * @param {HTMLFormElement} form - The form to validate
     * @returns {boolean} - True if all required fields are valid
     */
    validateRequired(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                this.showFieldError(field, 'Este campo é obrigatório');
                isValid = false;
            } else {
                this.clearFieldError(field);
            }
        });

        return isValid;
    },

    /**
     * Validate a specific field
     * @param {HTMLElement} field - The field to validate
     * @param {object} rules - Validation rules
     * @returns {boolean} - True if field is valid
     */
    validateField(field, rules) {
        let isValid = true;
        const value = field.value.trim();

        if (rules.required && !value) {
            this.showFieldError(field, 'Este campo é obrigatório');
            isValid = false;
        } else if (rules.minLength && value.length < rules.minLength) {
            this.showFieldError(field, `Mínimo de ${rules.minLength} caracteres`);
            isValid = false;
        } else if (rules.pattern && !rules.pattern.test(value)) {
            this.showFieldError(field, rules.message || 'Formato inválido');
            isValid = false;
        } else if (rules.custom && !rules.custom(value)) {
            this.showFieldError(field, rules.customMessage || 'Valor inválido');
            isValid = false;
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    },

    /**
     * Show error message for a field
     * @param {HTMLElement} field - The field with error
     * @param {string} message - Error message
     */
    showFieldError(field, message) {
        const errorDiv = field.nextElementSibling?.classList.contains('error-message')
            ? field.nextElementSibling
            : DOM.create('div', { className: 'error-message' });
        
        errorDiv.textContent = message;
        field.classList.add('error');
        
        if (!field.nextElementSibling?.classList.contains('error-message')) {
            field.parentNode.insertBefore(errorDiv, field.nextSibling);
        }
    },

    /**
     * Clear error message for a field
     * @param {HTMLElement} field - The field to clear error
     */
    clearFieldError(field) {
        field.classList.remove('error');
        const errorDiv = field.nextElementSibling;
        if (errorDiv?.classList.contains('error-message')) {
            errorDiv.remove();
        }
    }
};

// Export utilities
export {
    apiCall,
    APIError,
    handleAPIError,
    showErrorMessage,
    DOM,
    FormValidation
};