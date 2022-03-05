# Changelog

All **notable changes** to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Each log entry can be in the following kind: **Added**[^1], **Changed**[^2], **Deprecated**[^3], **Removed**[^4], **Fixed**[^5] and **Security**[^6]

## [Unreleased]

## [0.5.0] - 2022-03-05

### Added

- Print version and button to print in navbar
- Sort skills by name
- Translate bio, tags

### Fixed

- Layout reponsiveness
- Typography errors
- Page title typo

## [0.4.0] - 2022-03-02

### Added

- Monitoring and Error Handler with [Sentry](https://sentry.io)
- Contact page to send email messages
- Flash messages to appropiate handle success and failures contact messages
- Block index from search engine
- Translate static assets
- Language switcher between PT-BR and EN-US
- Categorize and filtering skills using tags

### Fixed

- Layout-wide improvements and refactor to accomodate new pages

## [0.3.0] - 2022-01-25

### Added

- Footer Section
- Skills sections load by tags, showing error and loading state
- Show/hide skills of Job Experience
- Section title underlined
- Linkable sections. An ID href is defined in resume's sections
- Seed database script
- Integrate database to query for resume
- Privacy focused analytics tool with Umami

## [0.2.0] - 2022-01-14

### Added

- Home page's scaffold
- Get resume's data from static props
- Render friendly experience' period date
- Setup Typography with Modular Scale to mantain Vertical Rhythm
- Setup Home page grid layout

[unreleased]: https://github.com/pherval/peter.dev.br/compare/v0.5.0...HEAD
[0.5.0]: https://github.com/pherval/peter.dev.br/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/pherval/peter.dev.br/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/pherval/peter.dev.br/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/pherval/peter.dev.br/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/pherval/peter.dev.br/releases/tag/v0.1.0

[^1]: `Added` for new features.
[^2]: `Changed` for changes in existing functionality.
[^3]: `Deprecated` for soon-to-be removed features.
[^4]: `Removed` for now removed features.
[^5]: `Fixed` for any bug fixes.
[^6]: `Security` in case of vulnerabilities.
