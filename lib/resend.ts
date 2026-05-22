import { Resend } from "resend";

let _client: Resend | null | undefined;

export function getResend(): Resend | null {
  if (_client !== undefined) return _client;
  const key = process.env.RESEND_API_KEY;
  _client = key ? new Resend(key) : null;
  return _client;
}

export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Fight Camp <hello@fightcampapp.com>";

export function welcomeEmailHtml(opts: {
  position?: number;
  discipline?: string | null;
  weightClass?: string | null;
}): string {
  const positionLine = opts.position
    ? `<p style="color:#fff;font-size:16px;margin:0 0 16px"><strong>You're #${opts.position.toLocaleString()} in line.</strong></p>`
    : "";
  const tagged =
    opts.discipline || opts.weightClass
      ? `<p style="color:#A1A1AA;font-size:14px;margin:0 0 16px">We've got you tagged as ${
          opts.discipline ?? "a fighter"
        }${opts.weightClass ? ` · ${opts.weightClass}` : ""}.</p>`
      : "";
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#0A0A0B;font-family:-apple-system,system-ui,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0B;padding:40px 16px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px">
        <tr><td style="padding:0 0 24px">
          <div style="display:inline-block;background:#FF6A1A;color:#fff;font-weight:900;letter-spacing:.04em;padding:10px 16px;border-radius:10px;font-size:14px">FIGHT CAMP</div>
        </td></tr>
        <tr><td>
          <h1 style="color:#fff;font-size:32px;font-weight:900;letter-spacing:-.02em;margin:0 0 12px;line-height:1.05">You're in.</h1>
          ${positionLine}
          ${tagged}
          <p style="color:#A1A1AA;font-size:15px;line-height:1.55;margin:0 0 16px">When we open invites, you'll be among the first fighters in. We'll send you a TestFlight or App Store link the moment your spot opens.</p>
          <p style="color:#A1A1AA;font-size:15px;line-height:1.55;margin:0 0 24px">Until then — train hard, log every round, and we'll see you on the inside.</p>
          <p style="color:#A1A1AA;font-size:13px;margin:0">— The Fight Camp team</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}
