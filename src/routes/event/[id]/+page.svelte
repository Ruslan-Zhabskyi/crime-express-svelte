<script lang="ts">
	import { onMount } from 'svelte';
	import { reportService } from '$lib/services/report-service';
	import { get } from 'svelte/store';
	import { currentSession, latestReport, subTitle } from '$lib/stores';
	import type { Report } from '$lib/types/report-types';
	import LeafletMap from "$lib/ui/LeafletMap.svelte";
	import Card from '$lib/ui/Card.svelte';
	import { generateByCategory } from '$lib/services/report-utils';

	export let data;
	let report: Report = null;
	let map: LeafletMap;
	let mapSatellite: LeafletMap;


	onMount(async () => {

		report = await reportService.getReportById(data.data.id, get(currentSession));
		subTitle.set(report.reportName);

		const popup = `${report.reportName}`;
		map.addMarker(report.lat, report.lng, popup);
		map.moveTo(report.lat, report.lng);
		mapSatellite.addMarker(report.lat, report.lng, popup);
		mapSatellite.moveTo(report.lat, report.lng);
	});

</script>



<div class="columns">
	<div class="column">
		<h1>Report name: {report?.reportName}</h1>
		<p>Description: {report?.description}</p>
		<p>Location: ({report?.lat}, {report?.lng})</p>
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







