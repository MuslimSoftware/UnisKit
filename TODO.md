# TODO List

This file tracks the development tasks, progress, and future plans.

## Tasks

- [X] - Continue polishing the front end (structure, base components, minimal page-specific styling) 
- [ ] - Create README guides for key folders (design, context)
- [ ] - Implement multi-step onboarding for profile completion
- [ ] - Rate limit the backend for security
- [ ] - Implement account recovery flow
- [ ] - Modify mobile splash screen image
- [ ] - Backend: Add specific error message for 422 errors (e.g., invalid email format)
- [ ] - Frontend: Add specific error message for 422 errors (e.g., invalid email format)
- [ ] - Test 404 Not Found page functionality
- [ ] - Implement display/use of auth info (tokens) & test token refresh

## Implementation Plan

### Polish Frontend

- Audit existing components for reusability.
- Create/refine base components (Buttons, Inputs, Modals, Layouts, etc.).
- Refactor page-specific components to leverage base components.
- Ensure consistent styling approach (e.g., using a design system or utility classes like Tailwind CSS).
- Minimize hardcoded values and inline styles within page files.
- Update component documentation or Storybook if applicable. 

### Implement Multi-step Onboarding

- **Goal:** Collect additional profile info (e.g., DOB, profile pic) after initial email OTP verification, handling interruptions gracefully.
- **Approach:** Use the user record state (NULL fields) instead of flags or temporary tables.
- **Backend:**
    - After successful OTP verification:
        - Check if user exists via email.
        - If not, create user record in main `users` table, leave required profile fields (e.g., `date_of_birth`, `profile_image_url`) as `NULL`.
        - If user exists, retrieve the record.
    - Check if required profile fields in the retrieved/created record are `NULL`.
    - Respond to frontend with auth token/session AND a status indicator (e.g., `profile_complete: false` if fields are `NULL`, `true` otherwise).
    - Implement an endpoint (e.g., `PATCH /api/users/me`) to receive and update the missing profile information, setting the fields to non-NULL values.
- **Frontend:**
    - After receiving the response from OTP verification:
        - If `profile_complete` is `false`, redirect to the profile completion form/screens.
        - If `profile_complete` is `true`, redirect to the main application dashboard/home.
    - Implement the profile completion form(s) to collect necessary data.
    - On form submission, call the backend endpoint to update the user profile.
    - Upon successful update from the backend, redirect to the main application.
- **Benefit:** This approach naturally handles users leaving and returning during onboarding; the `NULL` check will always redirect them back to the completion step until done.

### Rate Limit Backend

- Research suitable rate-limiting libraries/strategies (e.g., `express-rate-limit` for Node.js).
- Decide on the limiting criteria (per IP, per user ID, per endpoint).
- Implement middleware in the backend API.
- Add configuration options (limit, window).
- Test different scenarios (hitting limits, legitimate traffic).

### Implement Account Recovery Flow

- Define recovery mechanisms (e.g., secondary email, security questions, SMS verification).
- Design the UI/UX for initiating and completing the recovery process.
- Implement backend logic: generating secure recovery tokens/codes, verification steps, updating credentials/access.
- Consider security implications (preventing abuse).
- Test thoroughly. 