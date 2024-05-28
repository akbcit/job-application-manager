interface ApplyOptions {
    publisher?: string | null;
    apply_link?: string | null;
    is_direct?: boolean | null;
}

export interface SearchedJob {
    job_d: string;
    job_search_query: string;
    search_source: string;
    employer_name?: string | null;
    job_employment_type?: string | null;
    job_apply_link?: string | null;
    job_title: string;
    job_city: string;
    job_state?: string | null;
    job_country: string;
    job_google_link?: string | null;
    required_experience_in_months?: number | null;
    job_required_skills?: string | null;
    job_min_salary?: number | null;
    job_max_salary?: number | null;
    job_salary_currency?: string | null;
    job_salary_period?: string | null;
    job_posted_at_timestamp?: number | null;
    job_is_remote?: boolean | null;
    job_description?: string | null;
    apply_options?: ApplyOptions[];
    _id:string;
}