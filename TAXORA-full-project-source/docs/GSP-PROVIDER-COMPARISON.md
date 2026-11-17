# TAXORA GSP provider comparison

Research snapshot: 17 November 2026. Revalidate before procurement.

## Official GSTN directory
GSTN's current empanelled GSP page lists FinAGG Technologies, CDSL Ventures, ClearTax/Defmacro and Masters India IT Solutions among others:
https://www.gstn.org.in/empanelled-gsps

## Candidate evidence
- FinAGG: https://developer.gsp.finagg.in/ — developer portal documents API-key authentication and common GST search. It requests API-key onboarding via gsp@finagg.in. Full service coverage and commercial terms remain unconfirmed.
- CDSL Ventures: https://www.cvlindia.com/CVLINDIA_DOC/pdf/FAQ/GSP_FAQ.pdf — published FAQ says ASP onboarding is required and UAT credentials follow onboarding/agreement. Confirm current applicability directly.
- Quicko: https://help.quicko.com/portal/en/kb/articles/onboarding-as-an-asp-with-quicko-gsp — published ASP onboarding guidance. Verify the contracting GSP legal entity against GSTN's directory.
- ClearTax and Masters India: both appear in GSTN's directory. Obtain current ASP partner packs directly.

## Questions for every candidate
1. Are you currently empanelled and accepting new ASP partners?
2. Do you permit a multi-tenant SaaS product to onboard multiple CA firms and their client GSTINs?
3. Which APIs are available: taxpayer search, return status, GSTR-1, GSTR-3B, GSTR-2A/2B, e-invoice and e-way bill?
4. Does sandbox include taxpayer authentication, consent, filing and acknowledgement flows?
5. What are setup fees, monthly minimums, per-GSTIN/per-API charges and production rates?
6. What are rate limits, uptime SLA, support hours and version-change policy?
7. What security audits, data-location, retention, deletion and audit-log requirements apply?
8. What are production approval steps and test-case requirements?
9. Can you share current OpenAPI/Postman collection, error catalogue and sample payloads?
10. What taxpayer authorisation and signing method is required for each operation?

## Decision criteria
Score written responses on legal SaaS/ASP permission, API coverage, sandbox fidelity, total cost, security/compliance burden, support/SLA and production onboarding time. Reject any provider that cannot document authorisation or refuses written multi-tenant SaaS permission.
