# svelte zen garden

- hosted at https://svelte-zengarden.netlify.com/
- source at https://github.com/sw-yx/svelte-zen-garden

You can edit your CSS and it updates live.

![sveltezen](https://user-images.githubusercontent.com/6764957/73115075-7f2d4300-3eef-11ea-9c28-d499b7fbb4c1.gif)

you can also paste in a link to github gist in the editor. if the github gist has a file called `zengarden.css` it will pull that css and apply it.

Once you're happy with what you have, you can send it as a url by appending a `path` search param, e.g.

- https://svelte-zengarden.netlify.com/?path=https://gist.github.com/sw-yx/0e1d14276ef9d2608453fed3c7dfa4ec
- https://svelte-zengarden.netlify.com/?path=https://gist.github.com/sw-yx/67a8c6f39aae5e206b43eb662edb75b9

## Self serving your own CSS

We use the Github Gist API to get CSS, but you could also host your own CSS. just pass in the URL of your api call to the `path` search param and make sure the response conforms to this shape:

```json
{
	data: {
		files: {
			'zengarden.css': {
				'content': "YOURCSSHERE"
			}
		}
	}
}
```

## Future?

We could add a "save to Gist" feature.

We could add ability to pull image, font, and other assets from Gist.

We could add some sort of leaderboard or dynamic link list of other people who have submitted their zen gardens

[If you want to work on this lmk!](https://twitter.com/swyx)