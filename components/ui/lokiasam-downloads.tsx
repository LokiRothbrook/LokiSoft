"use client";

import { useState, useEffect } from "react";
import { Download, ChevronDown, ChevronUp, ExternalLink, AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReleaseAsset {
  name: string;
  browser_download_url: string;
  size: number;
}

interface Release {
  tag_name: string;
  assets: ReleaseAsset[];
  html_url: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function WindowsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 88 88" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 12.4l35.7-4.9v34.4H0zm40.3-5.5L88 0v41.5l-47.7.4zM0 45.7l35.7.2v34.5L0 75.5zm40.3.6L88 46.3v41.4L40.3 81z"/>
    </svg>
  );
}

function LinuxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.504 0c-.155 0-.315.008-.48.021C7.694.333 4.4 3.686 4.4 7.8c0 1.225.31 2.38.85 3.4-.583.602-1.025 1.307-1.025 2.1 0 1.31.905 2.38 2.1 2.83-.16.458-.25.95-.25 1.47 0 2.35 1.65 4.25 3.69 4.25.42 0 .82-.07 1.19-.2.92 1.45 2.52 2.41 4.34 2.41 1.82 0 3.42-.96 4.34-2.41.37.13.77.2 1.19.2 2.04 0 3.69-1.9 3.69-4.25 0-.52-.09-1.01-.25-1.47 1.2-.45 2.1-1.52 2.1-2.83 0-.79-.44-1.5-1.025-2.1.54-1.02.85-2.175.85-3.4 0-4.114-3.294-7.467-7.624-7.779A8.8 8.8 0 0012.504 0zm0 1.5c.14 0 .278.005.415.015 3.585.255 6.381 3.098 6.381 6.485 0 1.05-.27 2.04-.745 2.905a3.16 3.16 0 00-1.005-.165c-.96 0-1.79.455-2.315 1.145-.22-.03-.445-.045-.675-.045-.88 0-1.68.3-2.31.8-.62-.5-1.43-.8-2.31-.8-.23 0-.455.015-.675.045-.525-.69-1.355-1.145-2.315-1.145-.355 0-.69.06-1.005.165A6.875 6.875 0 015.2 7.8c0-3.387 2.796-6.23 6.381-6.485A7.3 7.3 0 0112.504 1.5zM9.5 15c-.828 0-1.5.895-1.5 2s.672 2 1.5 2 1.5-.895 1.5-2-.672-2-1.5-2zm5 0c-.828 0-1.5.895-1.5 2s.672 2 1.5 2 1.5-.895 1.5-2-.672-2-1.5-2z"/>
    </svg>
  );
}

function OtherDownloadRow({
  label,
  asset,
  note,
}: {
  label: string;
  asset: ReleaseAsset;
  note?: string;
}) {
  return (
    <a
      href={asset.browser_download_url}
      className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-sm group"
    >
      <div className="flex-1">
        <span className="font-medium">{label}</span>
        {note && <span className="ml-2 text-xs text-muted-foreground">{note}</span>}
        <span className="ml-2 text-xs text-muted-foreground">{formatBytes(asset.size)}</span>
      </div>
      <Download className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
    </a>
  );
}

function DownloadCard({
  title,
  subtitle,
  icon,
  accentClass,
  borderClass,
  primaryAsset,
  otherAssets,
  fallbackHref,
  version,
  loading,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accentClass: string;
  borderClass: string;
  primaryAsset: ReleaseAsset | undefined;
  otherAssets: { label: string; asset: ReleaseAsset; note?: string }[];
  fallbackHref: string;
  version: string;
  loading: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`glass rounded-2xl p-6 border ${borderClass}`}>
      <div className="flex items-center gap-3 mb-5">
        <div className={`${accentClass} shrink-0`}>{icon}</div>
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3 animate-pulse">
          <div className="h-11 bg-muted/40 rounded-lg" />
          <div className="h-6 bg-muted/20 rounded w-1/3" />
        </div>
      ) : primaryAsset ? (
        <>
          <a href={primaryAsset.browser_download_url}>
            <Button size="lg" className={`w-full mb-3 group ${accentClass.replace("text-", "bg-").replace("/20", "")} hover:opacity-90`}>
              <Download className="w-4 h-4 mr-2 shrink-0" />
              <span className="flex-1 text-left">Download for {title}</span>
              <span className="ml-2 text-xs opacity-75 font-mono shrink-0">{version}</span>
            </Button>
          </a>

          {otherAssets.length > 0 && (
            <div>
              <button
                className="w-full flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors px-1 py-1 rounded"
                onClick={() => setOpen(!open)}
              >
                <span>Other downloads</span>
                {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {open && (
                <div className="mt-2 space-y-1.5">
                  {otherAssets.map(({ label, asset, note }) => (
                    <OtherDownloadRow key={asset.name} label={label} asset={asset} note={note} />
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <a href={fallbackHref} target="_blank" rel="noopener noreferrer">
          <Button size="lg" className={`w-full ${accentClass.replace("text-", "bg-").replace("/20", "")} hover:opacity-90`}>
            <ExternalLink className="w-4 h-4 mr-2" />
            View Releases on GitHub
          </Button>
        </a>
      )}
    </div>
  );
}

export function LokiASAMDownloads() {
  const [release, setRelease] = useState<Release | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    fetch("https://api.github.com/repos/LokiRothbrook/LokiASAM/releases/latest")
      .then((r) => {
        if (!r.ok) throw new Error("API error");
        return r.json() as Promise<Release>;
      })
      .then((data) => {
        setRelease(data);
        setLoading(false);
      })
      .catch(() => {
        setFetchError(true);
        setLoading(false);
      });
  }, []);

  const assets = release?.assets ?? [];
  const version = release?.tag_name ?? "";

  const winExe = assets.find((a) => a.name.endsWith("_x64-setup.exe"));
  const winMsi = assets.find((a) => a.name.endsWith(".msi"));
  const linuxAppImage = assets.find((a) => a.name.endsWith(".AppImage"));
  const linuxDeb = assets.find((a) => a.name.endsWith(".deb"));
  const linuxRpm = assets.find((a) => a.name.endsWith(".rpm"));

  const RELEASES_URL = "https://github.com/LokiRothbrook/LokiASAM/releases";

  if (fetchError) {
    return (
      <div className="glass rounded-2xl p-8 text-center border border-neon-pink/20">
        <AlertCircle className="w-8 h-8 text-neon-pink mx-auto mb-3" />
        <p className="text-muted-foreground mb-4">Could not load latest release info.</p>
        <a href={RELEASES_URL} target="_blank" rel="noopener noreferrer">
          <Button className="bg-neon-pink hover:bg-neon-pink/80">
            View All Releases on GitHub
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DownloadCard
          title="Windows"
          subtitle="Windows 10 / 11, 64-bit"
          icon={<WindowsIcon className="w-8 h-8 text-neon-blue" />}
          accentClass="text-neon-blue"
          borderClass="border-neon-blue/20"
          primaryAsset={winExe}
          otherAssets={winMsi ? [{ label: ".msi Installer", asset: winMsi }] : []}
          fallbackHref={RELEASES_URL}
          version={version}
          loading={loading}
        />
        <DownloadCard
          title="Linux"
          subtitle="x86_64 — AppImage, DEB, RPM"
          icon={<LinuxIcon className="w-8 h-8 text-neon-cyan" />}
          accentClass="text-neon-cyan"
          borderClass="border-neon-cyan/20"
          primaryAsset={linuxAppImage}
          otherAssets={[
            ...(linuxDeb ? [{ label: ".deb Package", asset: linuxDeb }] : []),
            ...(linuxRpm ? [{ label: ".rpm Package", asset: linuxRpm }] : []),
          ]}
          fallbackHref={RELEASES_URL}
          version={version}
          loading={loading}
        />
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-neon-pink/20 bg-neon-pink/5 px-4 py-3 text-sm">
        <Info className="w-4 h-4 text-neon-pink shrink-0 mt-0.5" />
        <p className="text-muted-foreground leading-relaxed">
          <span className="text-foreground font-medium">Auto-updates</span> are currently supported
          for the <span className="text-neon-pink font-medium">Windows (.exe) installer</span> and{" "}
          <span className="text-neon-cyan font-medium">Linux (AppImage)</span> only. A DEB and RPM
          repository is coming soon for package-manager installs.
        </p>
      </div>
    </div>
  );
}
