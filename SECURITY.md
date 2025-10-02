# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Security Features

### 1. Input Sanitization
- All user inputs are sanitized to prevent XSS attacks
- HTML entities are properly escaped
- Input length is validated (max 10,000 characters)

### 2. Secure Storage
- localStorage data is validated before read/write
- Storage size limits are enforced (5MB)
- Invalid data is automatically cleared
- Data structure is validated on every load

### 3. Rate Limiting
- Actions are rate-limited to prevent abuse:
  - Challenge start: 5 attempts per minute
  - Day navigation: 20 attempts per minute
  - Day completion: 3 attempts per minute
  - Progress reset: 3 attempts per minute

### 4. Secure External Links
- All external links open with `noopener` and `noreferrer`
- URLs are validated before opening
- Only https:// and http:// protocols allowed

### 5. Content Security Policy
- Strict CSP headers implemented
- Frame ancestors blocked (prevents clickjacking)
- MIME type sniffing prevented
- XSS protection enabled

### 6. Analytics Security
- Event names and properties are sanitized
- Only primitive types allowed in analytics
- No sensitive data tracked

### 7. HTTPS Enforcement
- Strict Transport Security headers in production
- All external resources loaded over HTTPS

## Reporting a Vulnerability

If you discover a security vulnerability, please email security@example.com

**Please do NOT open a public issue.**

We will respond within 48 hours and provide updates every 72 hours until resolved.

## Security Best Practices for Users

1. **Keep your browser updated** - Use the latest version of your browser
2. **Use HTTPS** - Always access the app via HTTPS in production
3. **Clear your data** - Use the reset button to clear all stored data when needed
4. **Don't share sensitive information** - Avoid entering passwords or sensitive data

## Security Testing

Run security checks:
\`\`\`bash
npm audit
npm run lint
\`\`\`

## Dependencies

All dependencies are regularly updated to patch security vulnerabilities.
Run `npm audit` to check for known vulnerabilities.

## Compliance

This application follows:
- OWASP Top 10 security practices
- Content Security Policy Level 3
- GDPR data protection principles (no tracking without consent)
