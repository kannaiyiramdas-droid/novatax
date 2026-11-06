# TAXORA GSTIN Company Profile

Adds /dashboard/gst-profile with a signed-in GSTIN search page using FinAGG Common GST Search API. Returned taxpayer fields are displayed and can be downloaded as JSON. Lookups are recorded in the current organisation's audit log.

## Vercel environment variables
- FINAGG_API_KEY — issued by FinAGG
- FINAGG_ENV — sandbox or production
- FINAGG_API_VERSION — exact finaggVersion supplied by FinAGG
- FINAGG_GSP_VERSION — exact gspVersion supplied by FinAGG

Do not guess API version values. Do not put keys in GitHub or client-side code. Default host is sandbox; production is selected only when FINAGG_ENV=production.

This integration is not live until FinAGG issues/enables the API key and confirms the API versions. It only returns fields made available by the Common Search API; confidential return contents, invoices and tax-payment details are not exposed. Confirm the latest OpenAPI request and response schema with FinAGG before production use.
