# String Transform GitHub Action

The function takes a string and applies one or more
transformations to it.

Available transformations:

- replace (`Test.String` -> `Test_String`)
- lower (`TestProject` -> `testproject`)
- upper (`TestProject` -> `TESTPROJECT`)
- camel (`TestProject` -> `testProject`)
- kebab (`TestProject` -> `test-project`)
- pascal (`testProject` -> `TestProject`)
- snake (`TestProject` -> `test_project`)

## Inputs

### `source` (string)

**Required** The text that needs to be transformed.

### `transform` (string)

One or more transformations should be applied to the `source`
string (default is `lower`).

## Outputs

### `var` (string)

The resulting string after applying all transformations.

## Example usage

```yaml
steps:
  - name: String Transform
    id: transform
    uses: relab-services/string-transform@v1
    with:
       source: ${{ github.repository_owner }}
       transform: kebab

  - name: Print Output
    id: output
    run: echo "${{ steps.transform.outputs.var }}"
```

## String replace

The `replace` transformation supports both simple string replacement
and regular expression.

Simple string replacement:

```yaml
steps:
  - name: String Transform
    id: transform
    uses: relab-services/string-transform@v1
    with:
       source: ${{ github.repository_owner }}
       transform: replace(".", "_")

  - name: Print Output
    id: output
    run: echo "${{ steps.transform.outputs.var }}"
```

Regular expression replacement:

```yaml
steps:
  - name: String Transform
    id: transform
    uses: relab-services/string-transform@v1
    with:
       source: ${{ github.repository_owner }}
       transform: replace(/\W+/g, "_")

  - name: Print Output
    id: output
    run: echo "${{ steps.transform.outputs.var }}"
```

## Combine string transformations

You can use multiple transformations simultaneously. The transformations
will be applied sequentially in the order you specified.

```yaml
steps:
  - name: String Transform
    id: transform
    uses: relab-services/string-transform@v1
    with:
       source: ${{ github.repository_owner }}
       transform: |
          replace(".", "-")
          kebab
          lower

  - name: Print Output
    id: output
    run: echo "${{ steps.transform.outputs.var }}"
```

## License

Released under [MIT](/LICENSE) by [Sergey Zwezdin](https://github.com/sergeyzwezdin).
