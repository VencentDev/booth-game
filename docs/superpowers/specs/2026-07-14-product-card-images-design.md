# Product Card Images Design

## Goal

Update the matching game card fronts so revealed cards display only the product images from `public/products`. The current visible initials and product names should be removed from the card face.

## Scope

- Use the existing ten files in `public/products`: `1.jpeg` through `10.jpeg`.
- Keep the existing ten pair definitions and matching behavior.
- Preserve card titles for accessible labels and internal pair identity.
- Remove visible product initials and names from revealed card fronts.
- Remove the unused initials field from card data.
- Keep hidden card backs unchanged.

## Design

Each pair definition in `src/lib/deck.ts` will point to one numbered JPEG path:

- Pair 1 uses `/products/1.jpeg`
- Pair 2 uses `/products/2.jpeg`
- Continue through pair 10 using `/products/10.jpeg`

`MemoryCard` will render the revealed front as one image inside the existing image slot. The component will no longer render the initials overlay or visible `card-title` text. The image remains decorative because the button already has an accessible label based on the card title.

## Testing And Verification

- Existing tests should continue to pass.
- Build or lint should catch invalid JSX or TypeScript issues.
- The rendered board should show product images on revealed cards with no visible initials or names.
