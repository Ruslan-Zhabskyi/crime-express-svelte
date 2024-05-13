<script lang="ts">
	import { onMount } from 'svelte';
	import {page} from '$app/stores'
	import { reportService } from '$lib/services/report-service';
	import { get } from 'svelte/store';
	import { currentSession } from '$lib/stores';
	import type { Report } from '$lib/types/report-types';
	import Card from '$lib/ui/Card.svelte';
	import ReportList from '$lib/ui/ReportList.svelte';
	export let data;
	let report: Report = null;
	onMount(async () => {
		report = await reportService.getReportById(data.data.id, get(currentSession));
	});
</script>
<h1>Page id is {data.data.id}</h1>
<h1>Report description {report?.description}</h1>


