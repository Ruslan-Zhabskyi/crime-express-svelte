<script lang="ts">
	import { onMount } from 'svelte';
	import { reportService } from '$lib/services/report-service';
	import { get } from 'svelte/store';
	import { currentSession, latestReport, subTitle } from '$lib/stores';
	import type { Report } from '$lib/types/report-types';
	import LeafletMap from "$lib/ui/LeafletMap.svelte";
	import Card from '$lib/ui/Card.svelte';
	import { generateByCategory } from '$lib/services/report-utils';
	import { CldUploadWidget } from 'svelte-cloudinary';

	let info;
	let error;
	let imageURL;

	export let data;
	let report: Report = null;
	let map: LeafletMap;
	let mapSatellite: LeafletMap;

	function matchWeatherCode(option) {
		switch (option) {
			case "100":
				return "Clear";
			case "200":
				return "Partial clouds";
			case "300":
				return "Cloudy";
			case "400":
				return "Light Showers";
			case "500":
				return "Heavy Showers";
			case "600":
				return "Rain";
			case "700":
				return "Snow";
			case "800":
				return "Thunder";
			default:
				return "Unknown code";
		}
	};

	async function getCategoryNameById(id: string): Promise<string> {
		const categories = await reportService.getCategories(get(currentSession));
		const category = categories.find(category => category._id === id);
		return category ? category.categoryName : "Unknown";
	}
  let cat1 = "";
	onMount(async () => {
		report = await reportService.getReportById(data.data.id, get(currentSession));
		imageURL = report.imageURL;
		cat1 = await getCategoryNameById(report.category);
		subTitle.set(report.reportName);
		const weatherCondition = matchWeatherCode(report.code);
		const popup = `${report.reportName} occurred on ${report.timestamp}. The weather was ${weatherCondition} with temperature ${report.temperature} C`;
		map.addMarker(report.lat, report.lng, popup, cat1);
		map.moveTo(report.lat, report.lng);
		mapSatellite.addMarker(report.lat, report.lng, popup, cat1);
		mapSatellite.moveTo(report.lat, report.lng);
	});
	async function onUpload(result, widget) {
		if (result.event === 'success') {
			info = result.info;
			imageURL = info.secure_url;
			// Call the uploadImage method from the report service
			const updatedReport = await reportService.uploadImage(data.data.id, imageURL, get(currentSession));
			if (updatedReport) {
				imageURL = updatedReport.imageURL;
			}
		} else if (result.event === 'error') {
			error = result.error;
		}
		widget.close();
	}
</script>



<div class="columns">
	<div class="column">
		<h1> Report name: {report?.reportName}</h1>
		<h1> Event category: {cat1} </h1>
		<p> Description: {report?.description}</p>
		<p> Location: ({report?.lat}, {report?.lng})</p>
		<p> Timestamp: {report?.timestamp}</p>

		{#if error}
			<p>Error: {error.status}</p>
		{/if}
		{#if imageURL}
			<figure class="image is-4by3">
				<img class="object-fit" src={imageURL} alt="crime express logo" />
			</figure>
		{/if}

		<CldUploadWidget uploadPreset="cyy29psm" let:open let:isLoading {onUpload}>
			<button on:click={open} disabled={isLoading} class="button is-success is-fullwidth">Upload Image</button>
		</CldUploadWidget>
	</div>

<div class="column">
	<Card title="Location">
		<LeafletMap height={60} bind:this={map} />
	</Card>
</div>

	<div class="column">
		<Card title="Reports Locations">
			<LeafletMap id="Satellite" height={60} bind:this={mapSatellite} activeLayer="Satellite"/>
		</Card>
	</div>
</div>







