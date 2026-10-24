import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export function isSensitivePath(file) {
  const normalized = file.replaceAll('\\', '/');
  if (normalized === 'android/app/debug.keystore') {
    return false;
  }
  const base = path.posix.basename(normalized);
  return (
    (base.startsWith('.env') && base !== '.env.example') ||
    /\.(?:pem|key|p8|p12|pfx|jks|keystore|mobileprovision)$/i.test(base) ||
    /^(?:google-services\.json|GoogleService-Info\.plist|\.netrc|\.pypirc|id_rsa|id_ed25519)$/i.test(
      base,
    ) ||
    /(?:^service-account.*|.*-service-account)\.json$/i.test(base) ||
    /(?:^|\/)(?:\.aws|\.ssh)\//.test(normalized)
  );
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const files = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' })
    .split('\0')
    .filter(Boolean);
  const blocked = files.filter(isSensitivePath);
  if (blocked.length) {
    process.stderr.write(
      `Sensitive tracked paths are forbidden:\n${blocked.join('\n')}\n`,
    );
    process.exitCode = 1;
  } else {
    process.stdout.write(
      'Tracked sensitive-file policy passed (content scanning is separate).\n',
    );
  }
}
