<script lang="ts">
	import { reportService } from "$lib/services/report-service";
	import type { Report } from "$lib/types/report-types";
	import { currentSession, subTitle } from "$lib/stores";
	import Card from "$lib/ui/Card.svelte";
	import ReportList from "$lib/ui/ReportList.svelte";
	import { onMount } from "svelte";
	import { get } from "svelte/store";
	import ImageGal from './ImageGal.svelte';

	subTitle.set("Gallery");
	let reports: Report[] = [];
	onMount(async () => {
		reports = await reportService.getReports(get(currentSession));
	});
</script>

<Card title="Image Gallery">
	<ImageGal {reports} />
</Card>