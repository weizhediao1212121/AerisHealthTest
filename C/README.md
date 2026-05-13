# Task C: Xero API Questions

This section answers the Xero Accounting API scenario questions.

## C1. How would you prove that our Xero API connection is working before checking invoices?

1. Firstly I need to prove the OAuth connection and tenant selection are working.

Call:

```http
GET https://api.xero.com/connections
Authorization: Bearer <access_token>
Accept: application/json
```

Expected result:

- HTTP `200`.
- Response contains at least one connected tenant.
- The tenant has a `tenantId`.
- The tenant type is normally `ORGANISATION` for the Accounting API.

2. After that, save or select the correct `tenantId`. This value is required in the `xero-tenant-id` header for Accounting API calls.

As an extra check, I could call a simple Accounting API endpoint such as organisation details using the selected tenant ID. That proves both the token and the tenant header work.

## C2. If `/connections` works but `GET /Invoices` fails, what would you check?

If `/connections` works, the access token is probably valid. I would then check the Accounting API request details:

- The request uses the correct Accounting API URL:

```http
GET https://api.xero.com/api.xro/2.0/Invoices
```

- The request includes the selected tenant ID:

```http
xero-tenant-id: <tenantId from /connections>
Authorization: Bearer <access_token>
Accept: application/json
```

- The OAuth scopes include invoice read access, for example `accounting.transactions.read` or `accounting.transactions`.
- The connected Xero user has permission to view invoices in that organisation.
- The tenant ID belongs to the organisation being queried.
- The error response body is checked, not only the status code.
- If the status is `401`, refresh the token or re-authorise.
- If the status is `403`, check scopes and user permissions.
- If the status is `404`, check the URL and tenant.
- If the status is `429`, handle rate limiting.

## C3. What endpoint would you call to check invoices?

Call:

```http
GET https://api.xero.com/api.xro/2.0/Invoices
Authorization: Bearer <access_token>
xero-tenant-id: <tenantId>
Accept: application/json
```

Useful query or header options include:

- `page=1` for pagination.
- `Statuses=AUTHORISED` or another status filter.
- `If-Modified-Since` to fetch only invoices changed after a known time.

Example:

```http
GET https://api.xero.com/api.xro/2.0/Invoices?page=1&Statuses=AUTHORISED
Authorization: Bearer <access_token>
xero-tenant-id: <tenantId>
Accept: application/json
```

## C4. How would you check one specific invoice?

I would call the single invoice endpoint if I have the invoice ID:

```http
GET https://api.xero.com/api.xro/2.0/Invoices/{InvoiceID}
Authorization: Bearer <access_token>
xero-tenant-id: <tenantId>
Accept: application/json
```

If I only have an invoice number, I would filter the invoice list:

```http
GET https://api.xero.com/api.xro/2.0/Invoices?InvoiceNumbers=INV-001
Authorization: Bearer <access_token>
xero-tenant-id: <tenantId>
Accept: application/json
```

Then I would confirm the returned invoice matches the expected customer, amount, status, and date.

## C5. If the invoice API returns `429`, how should the backend handle it?

`429` means too many requests. The backend should treat it as a retryable rate-limit error.

Recommended handling:

- Do not immediately retry in a tight loop.
- Read Xero rate-limit headers such as remaining minute/day limits.
- If a `Retry-After` header is present, wait that many seconds before retrying.
- Use exponential backoff with jitter for repeated `429` responses.
- Queue or delay invoice sync jobs instead of failing the whole integration permanently.
- Return a clear temporary error to the caller, for example "Xero rate limit reached, retrying later".
- Reduce future API calls by using pagination, caching, and `If-Modified-Since`.
- Avoid duplicate writes by using idempotency keys when creating or updating data.

Xero documents common limits such as concurrent, per-minute, and daily API call limits. A good backend should monitor these headers and slow down before the limit is fully exhausted.

## Common Problems And Hints

- `/connections` does not prove invoice access by itself. It only proves the user authorised at least one tenant.
- Most Accounting API calls need the `xero-tenant-id` header.
- Use the tenant ID from `/connections`, not the connection ID.
- Invoice read access needs the correct accounting transaction scope.
- Always log the status code, response body, tenant ID, and request ID when debugging.
- For production syncs, prefer incremental reads using `If-Modified-Since` instead of fetching all invoices every time.
