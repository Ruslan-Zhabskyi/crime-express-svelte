<script lang="ts">
  import type { Report } from "$lib/types/report-types";

  export let reports: Report[];

  // Log the reports data
  console.log(reports);
</script>

<table class="table is-fullwidth">
  <thead>
    <th>Report Name</th>
    <th>Description</th>
    <th>Category</th>
  </thead>
  <tbody>
    {#each reports as report}
      <tr>
        <td>
          {report.reportName}
        </td>
        <td>
          {report.description}
        </td>
        <td>
          {#if typeof report.category !== "string"}
            {report.category.categoryName}
          {/if}
        </td>
        <td>
          <a href="/maps" class="button">
            <span class="icon is-small">
              <i class="fas fa-folder-open"></i>
            </span>
          </a>
        </td>
        <td>
          <a href="/maps" class="button">
            <span class="icon is-small">
              <i class="fas fa-trash" style="color: #fc738e;"></i>
            </span>
          </a>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
