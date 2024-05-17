<script>
	import { CldUploadWidget } from 'svelte-cloudinary';
	import { onMount } from 'svelte';

	let info;
	let error;
	let imageUrl;

	onMount(() => {
		// Load the image URL from the local storage when the component mounts
		imageUrl = localStorage.getItem('imageUrl');
	});

	function onUpload(result, widget) {
		if (result.event === 'success') {
			info = result.info;
			imageUrl = info.secure_url;

			// Save the image URL to the local storage
			localStorage.setItem('imageUrl', imageUrl);
		} else if (result.event === 'error') {
			error = result.error;
		}

		widget.close();
	}
</script>

<CldUploadWidget uploadPreset="cyy29psm" let:open let:isLoading {onUpload}>
	<button on:click={open} disabled={isLoading}>Upload an Asset</button>
</CldUploadWidget>

{#if error}
	<p>Error: {error.status}</p>
{/if}

{#if imageUrl}
	<p>
		<img width="200" height="200" src={imageUrl} alt="Uploaded image" />
	</p>
	<p>URL: {imageUrl}</p>
{/if}