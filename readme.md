# Ratioizer

### PWA for defining and working with ratios

I wanted an easy way to preserve ratios between values while changing any of the values involved. Specifically, a way to achieve a consistent coffee flavor when I am short on half & half. This involves setting up an ideal ratio between cream, sugar and coffee, then preserving that ratio when the amount of any of those ingredients fluctuates.

## Example

My nominal cup of coffee comprises 21g sugar, 197ml coffee, and 169ml half & half, but I want the coffee to taste the same when I have less than 169ml of half & half.

This can be achieved by converting the nominal amounts of coffee and sugar to ratios based on the nominal amount of half & half (197/169 and 21/169), then multiplying those ratios by the available amount of half & half (let's say 100ml).

197 / 169 \* 100 = ~117ml coffee

21 / 169 \* 100 = ~12g sugar

It's a straightforward exercise with a calculator, but it's still a lot of data entry. Instead, I would like to edit one of the ideal values and see the others adjust accordingly.
