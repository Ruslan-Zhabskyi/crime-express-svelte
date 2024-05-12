<script lang="ts">
	import {page} from '$app/stores'
	import { reportService } from '$lib/services/report-service';
	import { get } from 'svelte/store';
	import { currentSession } from '$lib/stores';

	let report;

	const loadReport = async () => {
		const eventId = $page.params.id;
		const session = get(currentSession);
		console.log('eventId:', eventId); // Debugging line
		console.log('session:', session); // Debugging line
		report = await reportService.getReportById(eventId, session);
		console.log('report:', report); // Debugging line
	};

	loadReport();
</script>

<h1>report name</h1>
{report?.description}