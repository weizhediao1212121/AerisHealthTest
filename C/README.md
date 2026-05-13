# Task C: Xero API Questions

This section answers the Xero Accounting API scenario questions.

## C1. How would you prove that our Xero API connection is working before checking invoices?

1. Firstly I will call `/connections` to prove the OAuth token works and to get the tenant ID.


Call:

```http
GET https://api.xero.com/connections
Authorization: Bearer <access_token>
Accept: application/json
```

Expected result:

- If it returns 200 and gives a tenantId, OAuth works.

2. After that, save or select the correct `tenantId`. This value is required in the `xero-tenant-id` header for Accounting API calls.

As an extra check, I could call a simple Accounting API endpoint such as organisation details using the selected tenant ID. That proves both the token and the tenant header work.

## C2. If `/connections` works but `GET /Invoices` fails, what would you check?

If `/connections` works, the access token is probably valid. I will then check the Accounting API request details:

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
- `401`: refresh the token or re-authorise.
- `403`: check scopes and user permissions.
- `404`: check the URL and tenant.
- `429`: handle rate limiting.

## C3. What endpoint would you call to check invoices?

use invoice ID:

```http
GET https://api.xero.com/api.xro/2.0/Invoices/{InvoiceID}
```
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

Or if you only know invoice number, filter:

```http
GET .../Invoices?InvoiceNumbers=INV-001
```

FUll: 

```http
GET https://api.xero.com/api.xro/2.0/Invoices?InvoiceNumbers=INV-001
Authorization: Bearer <access_token>
xero-tenant-id: <tenantId>
Accept: application/json
```

## C5. If the invoice API returns `429`, how should the backend handle it?

`429` means too many requests. 

Handling:

- Do not immediately retry in a tight loop.
- Read Xero rate-limit headers such as remaining minute/day limits.
- If a `Retry-After` header is present, wait that many seconds before retrying.
- Use exponential backoff with jitter for repeated `429` responses.
- Queue or delay invoice sync jobs instead of failing the whole integration permanently.
- Return a clear temporary error to the caller, for example "Xero rate limit reached, retrying later".
- Reduce future API calls by using pagination, caching, and `If-Modified-Since`.
- Avoid duplicate writes by using idempotency keys when creating or updating data.