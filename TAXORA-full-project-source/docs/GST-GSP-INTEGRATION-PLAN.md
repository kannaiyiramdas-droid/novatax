# TAXORA GSTN / GSP integration plan

## Legal route
TAXORA will operate as an ASP and connect to GSTN through a contracted, currently empanelled GSP. GSTN's FAQ says there is no separate ASP empanelment; the software provider must tie up with a GSP. TAXORA must sign the selected provider's ASP/partner agreement and meet its security, privacy, audit, infrastructure and onboarding requirements.

Official references:
- https://www.gstn.org.in/gsp-ecosystem
- https://www.gstn.org.in/empanelled-gsps
- https://www.gstn.org.in/faqs-category-details

Do not call GSTN private APIs directly, scrape the portal, automate CAPTCHA, reuse browser cookies or collect GST portal passwords. Use only the contracted GSP's approved APIs and authentication/consent journey. Taxpayer authorisation and signing must follow current GSTN and GSP specifications.

## Provider shortlist (not endorsements)
- FinAGG Technologies: on GSTN directory; developer portal documents API-key auth and common GST search. Confirm full return coverage, ASP contract, pricing and SaaS rights.
- CDSL Ventures: on GSTN directory; public GSP FAQ describes ASP onboarding and UAT after agreement. Confirm current API catalogue and terms.
- ClearTax / Defmacro: on GSTN directory. Request current ASP partner pack and API scope.
- Masters India IT Solutions: on GSTN directory. Request current ASP partner pack and API scope.
- Quicko: publishes an ASP onboarding guide; verify the actual contracting GSP entity against GSTN's current directory before signing.

No price, free production access, SLA or full API coverage is assumed. Re-check GSTN's live directory before contracting.

## Filing permissions: CA staff prepares; authorised approver files
1. CA staff creates and edits draft return data only for assigned organisations/GSTINs.
2. CA owner/admin or an explicitly authorised client approver reviews computed returns and source data.
3. Approver confirms GSTIN, tax period, liability, offsets and final payload.
4. Start the GSP-approved taxpayer authentication/consent/signing flow. OTP may be required for data access authorisation as well as filing, depending on the operation.
5. Submit only after required verification succeeds.
6. Persist provider reference, correlation ID, final status, ARN/acknowledgement and timestamps. Never mark filed merely because HTTP returned 200; verify final GSTN/GSP status.
7. Provide revoke/disconnect controls and auditable access history.

## Implementation status
- Provider catalog and runtime selector: implemented.
- FinAGG GSTIN profile adapter: implemented; API key and exact versions still required.
- Other provider adapters: not implemented; actual approved API specifications and contracts required.
- Return status/retrieval, GSTR-1/3B filing, GSTR-2A/2B reconciliation, e-invoice and e-way bill: not implemented.
- Consent/session persistence, role-specific approval workflow, signing, filing status and acknowledgements: not implemented.
- No production filing capability is enabled by this work.

## Runtime configuration
- GST_GSP_PROVIDER=finagg (default; other catalog values fail closed until adapters exist)
- GST_GSP_ENV=sandbox (default; never use production before approval)
- FinAGG requires FINAGG_API_KEY, FINAGG_API_VERSION and FINAGG_GSP_VERSION.

Store credentials only in server environment variables or an approved secrets manager. Never commit credentials.

## Next stages
1. Select a GSP after written comparison and sign its ASP agreement.
2. Obtain current API specs, sandbox credentials, auth/consent flows, rate limits and security requirements.
3. Design tenant-scoped GST connection, consent, return period, filing draft, approval and submission records; add Prisma migration.
4. Implement adapters from the selected provider's actual OpenAPI specification.
5. Build CA staff draft and authorised approver review/submit workflow with audit logs.
6. Complete provider-required sandbox positive/negative cases and security review.
7. Enable production only after provider/GSTN onboarding approval and operational readiness.
