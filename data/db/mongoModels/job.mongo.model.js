import mongoose from "mongoose";

const applyOptionsSchema = new mongoose.Schema({
    publisher: String,
    apply_link: String,
    is_direct: Boolean,
}, { _id: false });

const requiredExperienceSchema = new mongoose.Schema({
    no_experience_required: Boolean,
    required_experience_in_months: Number,
    experience_mentioned: Boolean,
    experience_preferred: Boolean,
}, { _id: false });

const requiredEducationSchema = new mongoose.Schema({
    postgraduate_degree: Boolean,
    professional_certification: Boolean,
    high_school: Boolean,
    associates_degree: Boolean,
    bachelors_degree: Boolean,
    degree_mentioned: Boolean,
    degree_preferred: Boolean,
    professional_certification_mentioned: Boolean,
}, { _id: false });

const jobSchema = new mongoose.Schema({
    search_query:String,
    job_id: { type: String, required: true },
    employer_name: String,
    employer_logo: String,
    employer_website: String,
    employer_company_type: String,
    job_publisher: String,
    job_employment_type: String,
    job_title: String,
    job_apply_link: String,
    job_apply_is_direct: Boolean,
    job_apply_quality_score: Number,
    apply_options: [applyOptionsSchema],
    job_description: String,
    job_is_remote: Boolean,
    job_posted_at_timestamp: Number,
    job_posted_at_datetime_utc: Date,
    job_city: String,
    job_state: String,
    job_country: String,
    job_latitude: Number,
    job_longitude: Number,
    job_benefits: String,
    job_google_link: String,
    job_offer_expiration_datetime_utc: Date,
    job_offer_expiration_timestamp: Number,
    job_required_experience: requiredExperienceSchema,
    job_required_skills: String,
    job_required_education: requiredEducationSchema,
    job_experience_in_place_of_education: Boolean,
    job_min_salary: Number,
    job_max_salary: Number,
    job_salary_currency: String,
    job_salary_period: String,
    job_highlights: mongoose.Schema.Types.Mixed,
    job_job_title: String,
    job_posting_language: String,
    job_onet_soc: String,
    job_onet_job_zone: String,
    job_occupational_categories: String,
    job_naics_code: String,
    job_naics_name: String,
});

export const Job = mongoose.model('Job', jobSchema);

