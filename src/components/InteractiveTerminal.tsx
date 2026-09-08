import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, Terminal as TerminalIcon, Cloud } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export const InteractiveTerminal: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [copied, setCopied] = useState(false);
  const [userCommand, setUserCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<HistoryItem[]>([]);
  const [typedIndex, setTypedIndex] = useState(prefersReducedMotion ? 4 : 0);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // Initial sequence typing animation
  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedIndex(4);
      return;
    }

    const timer = setInterval(() => {
      setTypedIndex(prev => {
        if (prev < 4) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 900);

    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  const handleCopyTranscript = async () => {
    const transcript = [
      'nafees@cloud:~$ whoami',
      'Nafees Ur Rehman',
      'nafees@cloud:~$ cat role.txt',
      'AWS DevOps Engineer | Cloud Infrastructure | Automation Engineering',
      'nafees@cloud:~$ terraform plan',
      'aws_vpc.production: Refreshing state... [id=vpc-0a883e]',
      'aws_eks_cluster.core_fleet: Refreshing state... [id=eks-prod-fleet]',
      'Plan: 12 to add, 0 to change, 0 to destroy.',
      'nafees@cloud:~$ deploy --production --verified',
      '[OK] Infra provisioned  [OK] Pipeline completed  [OK] Services healthy'
    ].join('\n');

    try {
      await navigator.clipboard.writeText(transcript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleExecuteCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = userCommand.trim();
    if (!raw) return;

    const cmd = raw.toLowerCase();
    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="text-on-surface-variant space-y-1">
            <div className="text-secondary font-medium">Available CLI Commands:</div>
            <div>• <span className="text-primary font-bold">whoami</span> - Identity &amp; Title</div>
            <div>• <span className="text-primary font-bold">role</span> - Infrastructure &amp; DevOps specialization</div>
            <div>• <span className="text-primary font-bold">plan</span> - Execute simulated Terraform dry-run</div>
            <div>• <span className="text-primary font-bold">deploy</span> - Run zero-downtime rolling deployment</div>
            <div>• <span className="text-primary font-bold">skills</span> - Verified infrastructure tooling</div>
            <div>• <span className="text-primary font-bold">status</span> - Cloud control plane health check</div>
            <div>• <span className="text-primary font-bold">uptime</span> - Production reliability metric</div>
            <div>• <span className="text-primary font-bold">contact</span> - Direct connection endpoints</div>
            <div>• <span className="text-primary font-bold">clear</span> - Clear terminal session history</div>
          </div>
        );
        break;

      case 'whoami':
        output = (
          <div className="text-primary font-bold">
            Nafees Ur Rehman — AWS DevOps &amp; Cloud Infrastructure Engineer
          </div>
        );
        break;

      case 'role':
      case 'cat role.txt':
      case 'cat role.json':
        output = (
          <div className="text-tertiary">
            AWS DevOps Engineer | Multi-AZ Cloud Architecture | Infrastructure as Code | Continuous Delivery
          </div>
        );
        break;

      case 'plan':
      case 'terraform plan':
        output = (
          <div className="text-on-surface-variant space-y-0.5">
            <div className="text-secondary">aws_vpc.production: Refreshing state... [id=vpc-0a883e]</div>
            <div className="text-secondary">aws_eks_cluster.core_fleet: Refreshing state... [id=eks-prod-fleet]</div>
            <div className="text-tertiary font-bold">Plan: 12 to add, 0 to change, 0 to destroy. (Zero drift verified)</div>
          </div>
        );
        break;

      case 'deploy':
      case 'deploy --production':
      case 'deploy --production --verified':
        output = (
          <div className="space-y-1">
            <div className="text-secondary">[1/3] Triggering GitHub Actions OIDC workflow...</div>
            <div className="text-primary">[2/3] Building distroless Docker image (layer cache hit: 98%)...</div>
            <div className="text-tertiary font-medium">[3/3] TargetGroup health checks passed (100% healthy nodes in us-east-1a &amp; us-east-1b).</div>
            <div className="text-tertiary font-bold">[SUCCESS] Zero-downtime rolling update complete.</div>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="text-on-surface-variant">
            AWS (VPC, EC2, IAM, S3, RDS, CloudFront, Route53), Terraform (v1.8+), Docker, Kubernetes (EKS), GitHub Actions, Linux/Bash, Python/Boto3
          </div>
        );
        break;

      case 'status':
        output = (
          <div className="text-tertiary flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            <span>All systems operational: AWS Control Plane ONLINE, S3 State Locked, 0 Incidents in 90 days.</span>
          </div>
        );
        break;

      case 'uptime':
        output = (
          <div className="text-secondary">
            Cluster Uptime: 99.99% Availability | Mean Time to Recovery (MTTR): &lt; 45 seconds.
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="text-on-surface-variant space-y-0.5">
            <div>Email: <a href="mailto:nafees@example.com" className="text-primary underline">nafees@example.com</a></div>
            <div>GitHub: <a href="https://github.com/expertnafees-hub" target="_blank" rel="noreferrer" className="text-secondary underline">github.com/expertnafees-hub</a></div>
            <div>LinkedIn: <a href="https://www.linkedin.com/in/nafees-ur-rehman556/" target="_blank" rel="noreferrer" className="text-secondary underline">linkedin.com/in/nafees-ur-rehman556</a></div>
          </div>
        );
        break;

      case 'clear':
        setCommandHistory([]);
        setUserCommand('');
        return;

      default:
        output = (
          <div className="text-error">
            command not found: {raw}. Type <span className="text-primary font-bold">help</span> for available commands.
          </div>
        );
        break;
    }

    setCommandHistory(prev => [...prev, { command: raw, output }]);
    setUserCommand('');

    setTimeout(() => {
      terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <div className="relative rounded-lg bg-surface-container-lowest border border-cardBorder shadow-2xl overflow-hidden font-mono text-xs">
      {/* Title bar */}
      <div className="h-10 bg-surface-container-low px-4 border-b border-cardBorder flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-error inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-primary inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-tertiary inline-block"></span>
        </div>

        <div className="text-on-surface-variant flex items-center gap-1.5 text-[11px]">
          <Cloud className="w-3.5 h-3.5 text-tertiary" />
          <span>nafees@prod-control-plane: ~ (us-east-1)</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleCopyTranscript}
            aria-label={copied ? 'Transcript copied' : 'Copy terminal output'}
            className="p-1 rounded text-outline hover:text-white hover:bg-surface-container transition-colors"
            title="Copy transcript"
          >
            {copied ? (
              <span className="flex items-center gap-1 text-tertiary text-[10px]">
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Copied</span>
              </span>
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Terminal Content Area */}
      <div
        className="p-5 leading-relaxed text-on-surface space-y-3.5 select-text overflow-x-auto max-h-[380px] scrollbar-thin"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Line 1: whoami */}
        {typedIndex >= 1 && (
          <div className="animate-in fade-in duration-300">
            <div className="text-on-surface-variant flex items-center gap-2">
              <span className="text-tertiary">nafees@cloud</span>
              <span className="text-outline">:</span>
              <span className="text-secondary">~</span>
              <span className="text-on-surface">$</span>
              <span className="text-on-surface font-medium">whoami</span>
            </div>
            <div className="text-primary mt-1 pl-4 font-bold">Nafees Ur Rehman</div>
          </div>
        )}

        {/* Line 2: role */}
        {typedIndex >= 2 && (
          <div className="animate-in fade-in duration-300">
            <div className="text-on-surface-variant flex items-center gap-2">
              <span className="text-tertiary">nafees@cloud</span>
              <span className="text-outline">:</span>
              <span className="text-secondary">~</span>
              <span className="text-on-surface">$</span>
              <span className="text-on-surface font-medium">cat role.txt</span>
            </div>
            <div className="text-on-surface-variant mt-1 pl-4">
              AWS DevOps Engineer | Cloud Infrastructure | Automation Engineering
            </div>
          </div>
        )}

        {/* Line 3: terraform plan */}
        {typedIndex >= 3 && (
          <div className="animate-in fade-in duration-300">
            <div className="text-on-surface-variant flex items-center gap-2">
              <span className="text-tertiary">nafees@cloud</span>
              <span className="text-outline">:</span>
              <span className="text-secondary">~</span>
              <span className="text-on-surface">$</span>
              <span className="text-on-surface font-medium">terraform plan</span>
            </div>
            <div className="mt-1 pl-4 text-on-surface-variant space-y-0.5 text-[11px]">
              <div className="text-secondary">aws_vpc.production: Refreshing state... [id=vpc-0a883e]</div>
              <div className="text-secondary">aws_eks_cluster.core_fleet: Refreshing state... [id=eks-prod-fleet]</div>
              <div className="text-tertiary font-medium">Plan: 12 to add, 0 to change, 0 to destroy.</div>
            </div>
          </div>
        )}

        {/* Line 4: deploy */}
        {typedIndex >= 4 && (
          <div className="animate-in fade-in duration-300">
            <div className="text-on-surface-variant flex items-center gap-2">
              <span className="text-tertiary">nafees@cloud</span>
              <span className="text-outline">:</span>
              <span className="text-secondary">~</span>
              <span className="text-on-surface">$</span>
              <span className="text-on-surface font-medium">deploy --production --verified</span>
            </div>
            <div className="mt-1 pl-4 flex flex-wrap gap-2 text-[10px]">
              <span className="px-2 py-0.5 rounded bg-surface-container text-tertiary flex items-center gap-1">
                ✓ [OK] Infra provisioned
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-container text-tertiary flex items-center gap-1">
                ✓ [OK] Pipeline completed
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-container text-secondary flex items-center gap-1">
                ✓ [OK] Services healthy
              </span>
            </div>
          </div>
        )}

        {/* User Command History */}
        {commandHistory.map((item, idx) => (
          <div key={idx} className="space-y-1 pt-1 border-t border-cardBorder/40">
            <div className="text-on-surface-variant flex items-center gap-2">
              <span className="text-tertiary">nafees@cloud</span>
              <span className="text-outline">:</span>
              <span className="text-secondary">~</span>
              <span className="text-on-surface">$</span>
              <span className="text-white font-medium">{item.command}</span>
            </div>
            <div className="pl-4">{item.output}</div>
          </div>
        ))}

        {/* Interactive CLI Input */}
        <form onSubmit={handleExecuteCommand} className="flex items-center gap-2 pt-1">
          <label htmlFor="terminal-input" className="sr-only">Interactive Terminal Command Prompt</label>
          <span className="text-tertiary">nafees@cloud</span>
          <span className="text-outline">:</span>
          <span className="text-secondary">~</span>
          <span className="text-on-surface">$</span>
          <input
            id="terminal-input"
            ref={inputRef}
            type="text"
            value={userCommand}
            onChange={e => setUserCommand(e.target.value)}
            placeholder="type 'help' or commands..."
            autoComplete="off"
            spellCheck="false"
            className="flex-1 bg-transparent border-none outline-none text-on-surface placeholder:text-outline-variant font-mono text-xs focus:ring-0 p-0"
          />
          <span className="inline-block w-2 h-3.5 bg-primary animate-terminal-blink" aria-hidden="true"></span>
        </form>

        <div ref={terminalBottomRef} />
      </div>

      {/* Bottom Micro-Status */}
      <div className="bg-surface-container-high/60 px-4 py-2 flex items-center justify-between text-[11px] font-mono text-on-surface-variant border-t border-cardBorder">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-tertiary"></span>
          <span>CLUSTER HEALTH: 100%</span>
        </span>
        <span className="text-secondary flex items-center gap-1">
          <TerminalIcon className="w-3 h-3" />
          <span>ENV: PROD-US-EAST</span>
        </span>
      </div>
    </div>
  );
};
