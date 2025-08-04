# Pulsar Forms

## Abstract
Provides a collection of Latte form components compatible with Bootstrap.

## Installation

### Composer dependency
The first step is to include the PHP composer dependency in the project. If the 
library is private, be sure to include the repository.

```json
"repositories": [
    {
      "type": "vcs",
      "url":  "https://github.com/ophelios-studio/pulsar-forms.git"
    }
]
```

```json
"require": {
    "ophelios/pulsar-forms": "dev-main"
}
```

Once it's done, update the project's dependencies. Should download and place the necessary 
files into the project with the standard Publisher class.

```shell
composer update
```

## Usage

You must include the components you want to use in your project's layout file.

```latte
{import ../pulsar/components/undraw.latte}
{import ../pulsar/forms/field.latte}
{import ../pulsar/forms/text.latte}
{import ../pulsar/forms/password.latte}
{import ../pulsar/forms/checkbox.latte}
```
