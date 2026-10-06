import { PipelineStep, EngineeringPrinciple, CurriculumItem } from '../types';

// These milestones summarize different projects. They are not a single running production pipeline.
export const pipelineSteps: PipelineStep[] = [
  { stepNumber: '01', name: 'CODE', subtext: 'Public source', badge: 'AVAILABLE', badgeColor: 'secondary', icon: 'code', details: ['Project code is version-controlled in the linked public repositories.', 'Changes can be proposed on branches and reviewed in pull requests.', 'The project cards link the implemented scope.'] },
  { stepNumber: '02', name: 'REVIEW', subtext: 'Pull requests', badge: 'WORKFLOW CODE', badgeColor: 'primary', icon: 'merge', details: ['Portfolio pull requests run validation and frontend build jobs.', 'Three-tier Terraform changes have documented review notes and limitations.', 'Branch protection and required approvals are not claimed as verified settings.'] },
  { stepNumber: '03', name: 'TEST', subtext: 'Project-specific', badge: 'RUNS RECORDED', badgeColor: 'tertiary', icon: 'fact_check', details: ['Portfolio: TypeScript checks, infrastructure gate, and Vite build.', 'Payment API: unit tests passed in the recorded run.', 'Terraform labs: format and schema validation, without deployment proof.'] },
  { stepNumber: '04', name: 'BUILD', subtext: 'Web / container', badge: 'RUNS RECORDED', badgeColor: 'secondary', icon: 'inventory_2', details: ['Vite builds the portfolio bundle.', 'Payment API CI builds a Docker image.', 'The payment publishing job rebuilds the image; digest parity with the scanned image remains unverified.'] },
  { stepNumber: '05', name: 'SCAN', subtext: 'Trivy / tfsec', badge: 'SCOPE VARIES', badgeColor: 'secondary', icon: 'shield', details: ['Payment API: configured Trivy gate passed in the recorded run.', 'Portfolio Trivy and three-tier tfsec scans are advisory, with non-blocking findings possible.', 'GitOps application: reviewed main CI fails at Trivy; the cause needs investigation.'] },
  { stepNumber: '06', name: 'PUBLISH', subtext: 'S3 / ECR', badge: 'RUNS RECORDED', badgeColor: 'tertiary', icon: 'rocket', details: ['Portfolio: OIDC authentication, S3 synchronization, and CloudFront invalidation recorded.', 'Payment API: OIDC authentication and ECR publication recorded.', 'Container runtime deployment and GitOps cluster delivery are pending.'] },
  { stepNumber: '07', name: 'OPERATE', subtext: 'Next milestones', badge: 'PENDING', badgeColor: 'primary', icon: 'monitoring', details: ['Three-tier: implement a restricted application-to-RDS connection and record a lab deployment.', 'Record real request results, a controlled failure exercise, and cleanup.', 'Publish runtime health, rollback, or recovery claims only after measuring them.'] },
];

export const principlesData: EngineeringPrinciple[] = [
  { id: 'p1', number: 'PRINCIPLE_01', title: 'Automate Repetitive Work', quote: '“Make recurring steps repeatable and reviewable.”', body: 'Use scripts and pipelines to reduce manual mistakes. Check their inputs, outputs, and failure behavior before relying on them.', footerTag: 'REPEATABLE WORKFLOWS', color: 'primary' },
  { id: 'p2', number: 'PRINCIPLE_02', title: 'Infrastructure as Code', quote: '“Infrastructure should be version-controlled, reviewable, and reproducible.”', body: 'Store configuration in Git, review plans, and protect state. Declarative code supports drift detection; it does not prevent every out-of-band change.', footerTag: 'REVIEW CODE AND PLANS', color: 'secondary' },
  { id: 'p3', number: 'PRINCIPLE_03', title: 'Test Recovery', quote: '“Describe what was tested, how it failed, and how it recovered.”', body: 'Choose a manageable lab, collect request results and timestamps, and document limitations. Recovery time is a measured result, not an architectural promise.', footerTag: 'MEASURE BEFORE CLAIMING', color: 'tertiary' },
  { id: 'p4', number: 'PRINCIPLE_04', title: 'Scope Security Controls', quote: '“Review identity, network access, secrets, and scan behavior.”', body: 'Short-lived credentials and restricted network paths reduce exposure. Document exceptions and unresolved findings; a green workflow is not a complete security assessment.', footerTag: 'EXPLICIT BOUNDARIES', color: 'primary' },
];

export const curriculumData: CurriculumItem[] = [
  { id: 'c1', folder: 'linux-and-networking/', details: 'processes, permissions, DNS, CIDR, route tables, and troubleshooting', status: 'IN PROGRESS', statusColor: 'primary' },
  { id: 'c2', folder: 'three-tier-lab/', details: 'restricted app-to-RDS credentials, database query, recorded apply and cleanup', status: 'UPCOMING', statusColor: 'secondary' },
  { id: 'c3', folder: 'terraform-state/', details: 'encrypted versioned S3 backend and native S3 locking with a compatible Terraform version', status: 'UPCOMING', statusColor: 'secondary' },
  { id: 'c4', folder: 'container-delivery/', details: 'document payment-api, publish the scanned digest, and validate runtime deployment', status: 'UPCOMING', statusColor: 'secondary' },
  { id: 'c5', folder: 'gitops-validation/', details: 'investigate Trivy failure and record image release, config promotion, and cluster sync', status: 'UPCOMING', statusColor: 'secondary' },
  { id: 'c6', folder: 'eks-lab/', details: 'review an account-backed plan, cluster access, TLS, scaling, and teardown', status: 'UPCOMING', statusColor: 'secondary' },
];

export const activeCurriculumTree = curriculumData;
