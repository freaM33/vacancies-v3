import { getMockKataJob } from '../mocks/kataJobs';
import type { KataJob, KataJobResponse } from '../types/kataJob';

const API_URL = 'https://kata-jobs.onrender.com/api/jobs';

export async function fetchVacancyById(
  id: string,
): Promise<{ data: KataJob; isServiceUnavailable: boolean }> {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch vacancy: ${response.status}`);
    }

    const payload = (await response.json()) as KataJobResponse;

    return {
      data: payload.job,
      isServiceUnavailable: false,
    };
  } catch {
    return {
      data: getMockKataJob(id),
      isServiceUnavailable: true,
    };
  }
}
