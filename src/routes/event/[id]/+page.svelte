<script lang="ts">
	import { onMount } from 'svelte';
	import { reportService } from '$lib/services/report-service';
	import { get } from 'svelte/store';
	import { currentSession, subTitle } from '$lib/stores';
	import type { Report } from '$lib/types/report-types';
	import Card from '$lib/ui/Card.svelte';
	import ReportList from '$lib/ui/ReportList.svelte';
	export let data;
	let report: Report = null;
	let sessionID = get(currentSession);

	onMount(async () => {

		report = await reportService.getReportById(data.data.id, get(currentSession));
		subTitle.set(report.reportName);
	});

</script>
<h1>Page id is {data.data.id}</h1>

<h1>Report: {JSON.stringify(report)}</h1>

<h1>Session: {JSON.stringify(sessionID)}</h1>

<h1>Report name {report?.reportName}</h1>
<h1>Report description {report?.description}</h1>
<h1>Report lat: {report?.lat}</h1>
<h1>Report lng: {report?.lng}</h1>







