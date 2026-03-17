import { CopyButton } from "@/components/shared/CopyButton";
import type { DrupalTemplate } from "@/types";

const steps = [
  {
    title: "Create your project",
    getCommand: (t: DrupalTemplate) => t.composerCommand,
  },
  {
    title: "Navigate to the project",
    getCommand: () => "cd my-site",
  },
  {
    title: "Start local development",
    getCommand: () => "lando start",
  },
  {
    title: "Install Drupal",
    getCommand: () => "lando drush site:install --existing-config -y",
  },
  {
    title: "Apply the base recipe",
    getCommand: () => "lando drush recipe recipes/base",
  },
];

export function InstallInstructions({
  template,
}: {
  template: DrupalTemplate;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Prerequisites</h3>
        <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>PHP {template.phpVersion}</li>
          <li>Composer 2.x</li>
          <li>Lando or DDEV for local development</li>
          <li>Node.js 20+ (for theme compilation)</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Installation Steps</h3>
        {steps.map((step, i) => {
          const cmd = step.getCommand(template);
          return (
            <div key={i}>
              <p className="text-sm font-medium mb-2">
                {i + 1}. {step.title}
              </p>
              <div className="rounded-lg border bg-zinc-950 p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400 text-sm font-mono">$</span>
                    <code className="text-sm text-zinc-300 font-mono">
                      {cmd}
                    </code>
                  </div>
                  <CopyButton text={cmd} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
