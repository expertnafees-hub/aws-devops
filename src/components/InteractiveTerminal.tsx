import React, { useState, useRef, useEffect } from 'react';
import { Copy, Check, Terminal as TerminalIcon } from 'lucide-react';
import { useClipboard } from '../hooks/useClipboard';
import { evidenceSnapshot, evidenceLinks, githubProfileUrl } from '../data/portfolioEvidence';

const commands: Record<string, string> = {
  help: 'Available: whoami, role, skills, projects, status, uptime, plan, deploy, contact, clear.\nAll outputs are portfolio examples; no commands contact AWS.',
  whoami: 'Nafees Ur Rehman\nAWS DevOps portfolio / seeking junior opportunities',
  role: 'Focus: AWS infrastructure, Terraform, CI/CD, Linux, and containers.',
  skills: 'Project code: Terraform, GitHub Actions, Docker, Python, TypeScript.\nRecorded AWS delivery: OIDC, S3, CloudFront, ECR.\nEKS and GitOps cloud integration: pending.',
  projects: 'Six projects across seven code repositories.\nSee the project cards for source code, recorded results, and remaining work.',
  status: `Evidence snapshot: ${evidenceSnapshot}\nWebsite delivery: recorded successful run.\nPayment API: ECR publication recorded; runtime pending.\nThree-tier and EKS: validation recorded; cloud tests pending.\nGitOps: reviewed main scan step failed.\nNo live AWS health check is performed.`,
  uptime: 'No measured uptime is published. This example terminal cannot query service availability.',
  plan: 'Example workflow: terraform init → terraform fmt -check → terraform validate → review terraform plan.\nNo Terraform process runs here; no plan or resource counts have been generated.',
  deploy: `Recorded website delivery workflow:\nBuild → AWS OIDC → S3 sync → CloudFront invalidation.\nEvidence: ${evidenceLinks.websiteDeploy}\nThis command only displays that record; it starts no deployment.`,
  contact: `LinkedIn: https://www.linkedin.com/in/nafees-ur-rehman556/\nGitHub: ${githubProfileUrl}`,
};

export const InteractiveTerminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ command: string; output: string }[]>([{ command: 'whoami', output: commands.whoami }]);
  const { copied, copy } = useClipboard();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const execute = (event: React.FormEvent) => {
    event.preventDefault();
    const raw = input.trim();
    if (!raw) return;
    setInput('');
    const aliases: Record<string, string> = { 'terraform plan': 'plan', 'cat role.txt': 'role' };
    const command = aliases[raw.toLowerCase()] || raw.toLowerCase();
    if (command === 'clear') { setHistory([]); return; }
    const output = commands[command] || `Unknown example command: ${raw}. Type help for available commands.`;
    setHistory(previous => [...previous, { command: raw, output }]);
  };

  return (
    <div className="rounded-xl bg-[#070A0F] border border-cardBorder overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between gap-3 p-3 bg-surface-container-low border-b border-cardBorder">
        <span className="text-xs font-mono text-secondary flex items-center gap-2"><TerminalIcon className="w-4 h-4" />Portfolio terminal demo</span>
        <button type="button" onClick={() => void copy(history.map(item => `$ ${item.command}\n${item.output}`).join('\n\n'))} aria-label="Copy terminal transcript" className="text-xs text-on-surface-variant hover:text-white flex items-center gap-1">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}{copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <p className="p-4 pb-0 text-xs text-secondary leading-relaxed">Interactive demo. Commands display examples and recorded evidence; they do not contact AWS or execute infrastructure changes.</p>
      <div ref={scrollRef} className="h-64 overflow-y-auto p-4 font-mono text-xs leading-relaxed space-y-4" aria-live="polite" aria-relevant="additions">
        {history.map((item, index) => (
          <div key={index}>
            <p className="text-primary break-all">nafees@portfolio:~$ {item.command}</p>
            <p className="text-on-surface-variant whitespace-pre-wrap break-words mt-1">{item.output}</p>
          </div>
        ))}
      </div>
      <form onSubmit={execute} className="flex items-center gap-2 px-4 py-3 border-t border-cardBorder font-mono text-xs">
        <label htmlFor="terminal-command" className="text-primary shrink-0">demo:~$</label>
        <input id="terminal-command" aria-label="Terminal command" value={input} onChange={event => setInput(event.target.value)} placeholder="Type help and press Enter" autoComplete="off" spellCheck={false} className="w-full min-w-0 bg-transparent text-white placeholder:text-outline focus:outline-none" />
      </form>
    </div>
  );
};
