## Git(hub) Flow:

1. Checkout and pull latest `dev` branch
2. Make your new feature branch following naming conventions
3. Do your changes, and make pull request in github back to `dev` branch
4. Ask for review, or(and) assign people on your pr to speed up process
5. After receiving enough approves and testing, merge your pull request to `dev`

`Note: make sure to pull dev frequent, to detect compatibility issues early`


## Git naming conventions:

- branch name should start with ticket id, separated by underscore with short description in kebab-case
```
wrong
MID-12_add_cool_feature

wrong
MID-12-add-cool-feature

correct
MID-12_add-cool-feature
```

- commit should include ticket id in square brackets, following by space and meaningful description what was done
```
wrong
MID-12 add new linter rules for react

wrong
(MID-12) add new linter rules for react

wrong
MID-12-add-new-linter-rules-for-react

correct
[MID-12] add linter rules for react hooks
```
