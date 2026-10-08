import React, { useState, useRef, useEffect } from 'react';
import { Copy, Check, Terminal as TerminalIcon } from 'lucide-react';
import { useClipboard } from '../hooks/useClipboard';
import { githubProfileUrl } from '../data/portfolioEvidence';

interface HistoryItem {
  command: string;
  output: string;
}

const commands: Record<string, string> = {
  help: [
    'Available commands:',
    '  whoami    - Identity and engineering focus',
    '  skills    - Core tools and technologies',
    '  projects  - Overview of public projects and repositories',
    '  status    - Summary of verified workflow runs',
    '  plan      - Example Terraform execution plan',
    '  deploy    - Example CI/CD deployment workflow',
    '  contact   - Professional contact links',
    '  clear     - Clear terminal history'
  ].join('\n'),

  whoami: [
    'Nafees Ur Rehman',
    'Role: AWS DevOps & Cloud Infrastructure Engineer',
    'Focus: Building AWS infrastructure and automating delivery with Terraform, Docker & GitHub Actions.',
    'Status: Seeking junior AWS DevOps opportunities.'
  ].join('\n'),

  skills: [
    'Core Engineering Stack:',
    '• Cloud: AWS (VPC, EC2, ALB, S3, CloudFront, ECR, RDS, IAM, CloudWatch)',
    '• Infrastructure as Code: Terraform, HCL, Remote State Locking',
    '• Containers: Docker, Multi-Stage Builds, Distroless Patterns, Amazon ECR',
    '• CI/CD: GitHub Actions, AWS OIDC Role Assumption, Automated Testing',
    '• Systems: Linux (Ubuntu/Amazon Linux), Bash, Python, Networking (CIDR/DNS)'
  ].join('\n'),

  projects: [
    'Six projects across seven public repositories:',
    '1. Three-Tier Infrastructure Lab - Terraform ALB, ASG, SSM, and RDS MySQL',
    '2. AWS Portfolio Delivery - OIDC-authenticated S3 sync and CloudFront invalidation',
    '3. Payment API Container Delivery - Docker, Trivy security gate, and ECR publish',
    '4. EKS Platform Lab - Modular Terraform, private cluster endpoint, and IRSA',
    '5. GitOps Delivery - Containerized API paired with Helm platform configuration',
    '6. VPC Networking Foundation - Custom VPC, public subnetting, and IGW routing'
  ].join('\n'),

  status: [
    'Workflow Verification Status:',
    '• Portfolio Website: S3 sync & CloudFront invalidation passing in GitHub Actions',
    '• Payment API: Unit tests, Trivy scan, and ECR image publication passing in CI',
    '• Three-Tier Architecture: Terraform syntax and schema validation passing in CI',
    '• EKS Platform Lab: Modular Terraform validation passing in CI',
    '• GitOps API: Main branch CI fails at Trivy step (investigation in progress)',
    '• VPC Foundation: Published Terraform networking lab'
  ].join('\n'),

  plan: [
    'Example Terraform Plan Workflow:',
    '$ terraform plan -out=tfplan',
    '  + aws_vpc.main                       [10.0.0.0/16]',
    '  + aws_subnet.public[0]               [10.0.1.0/24, us-east-1a]',
    '  + aws_subnet.public[1]               [10.0.2.0/24, us-east-1b]',
    '  + aws_lb.main                        [Application Load Balancer]',
    '  + aws_autoscaling_group.app          [min=2, desired=2, max=4]',
    'Plan: 12 to add, 0 to change, 0 to destroy.',
    '(Example display — no Terraform process executed)'
  ].join('\n'),

  deploy: [
    'Recorded Portfolio Delivery Workflow:',
    '1. Run typecheck & production build (tsc && vite build)',
    '2. Assume IAM role via AWS OIDC (temporary STS credentials)',
    '3. Sync hashed assets to S3 (Cache-Control: immutable)',
    '4. Sync index.html to S3 (Cache-Control: must-revalidate)',
    '5. Create CloudFront invalidation (/*)',
    '(Example display — no deployment triggered)'
  ].join('\n'),

  contact: [
    'Professional Connections:',
    '• LinkedIn: https://www.linkedin.com/in/nafees-ur-rehman556/',
    `• GitHub:   ${githubProfileUrl}`,
    '• Opportunities: Open to junior AWS DevOps and cloud infrastructure roles.'
  ].join('\n'),
};

const initialBootLines: HistoryItem[] = [
  { command: 'whoami', output: commands.whoami },
  { command: 'status', output: 'Portfolio deployment & ECR image publication verified in GitHub Actions. Type "help" for commands.' }
];

export const InteractiveTerminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>(initialBootLines);
  const { copied, copy } = useClipboard();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const execute = (event: React.FormEvent) => {
    event.preventDefault();
    const raw = input.trim();
    if (!raw) return;
    setInput('');

    const normalized = raw.toLowerCase();
    const aliases: Record<string, string> = {
      'terraform plan': 'plan',
      'terraform apply': 'deploy',
      'cat role.txt': 'whoami',
      'ls': 'projects',
      'ls -la': 'projects'
    };

    const command = aliases[normalized] || normalized;

    if (command === 'clear') {
      setHistory([]);
      return;
    }

    const output = commands[command] || `Unknown command: "${raw}". Type "help" for a list of available commands.`;
    setHistory(prev => [...prev, { command: raw, output }]);
  };

  return (
    <div className="rounded-xl bg-[#070A0F] border border-cardBorder overflow-hidden shadow-2xl flex flex-col">
      {/* Header Bar */}
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-surface-container-low border-b border-cardBorder">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block"></span>
          </div>
          <span className="text-xs font-mono text-secondary flex items-center gap-1.5 ml-2">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>nafees@cloud-terminal ~ demo</span>
          </span>
        </div>

        <button
          type="button"
          onClick={() => void copy(history.map(item => `$ ${item.command}\n${item.output}`).join('\n\n'))}
          aria-label="Copy terminal transcript"
          className="text-xs font-mono text-on-surface-variant hover:text-white flex items-center gap-1 px-2 py-0.5 rounded hover:bg-surface-container transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-tertiary" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Honest Demo Sub-Banner */}
      <div className="px-4 py-1.5 bg-[#0D1117] border-b border-cardBorder/60 text-[11px] font-mono text-outline flex items-center justify-between">
        <span>Interactive demo. Commands output verified project information and example workflows.</span>
      </div>

      {/* Terminal Output Area */}
      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        className="h-64 sm:h-72 overflow-y-auto p-4 font-mono text-xs leading-relaxed space-y-3.5 cursor-text scrollbar-thin select-text"
        aria-live="polite"
        aria-relevant="additions"
      >
        {history.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center gap-2 text-primary">
              <span className="text-secondary font-bold">nafees@portfolio:~$</span>
              <span className="text-white font-medium">{item.command}</span>
            </div>
            <div className="text-on-surface-variant whitespace-pre-wrap pl-4 border-l border-cardBorder/40">
              {item.output}
            </div>
          </div>
        ))}
      </div>

      {/* Command Input Form */}
      <form onSubmit={execute} className="flex items-center gap-2 px-4 py-2.5 border-t border-cardBorder bg-[#0D1117] font-mono text-xs">
        <label htmlFor="terminal-command" className="text-secondary font-bold shrink-0">
          nafees@portfolio:~$
        </label>
        <input
          id="terminal-command"
          ref={inputRef}
          aria-label="Terminal command prompt"
          value={input}
          onChange={event => setInput(event.target.value)}
          placeholder="Type 'help' and press Enter..."
          autoComplete="off"
          spellCheck={false}
          className="w-full min-w-0 bg-transparent text-white placeholder:text-outline-variant focus:outline-none font-mono text-xs"
        />
        <span className="w-2 h-4 bg-primary animate-terminal-blink shrink-0" aria-hidden="true" />
      </form>
    </div>
  );
};
