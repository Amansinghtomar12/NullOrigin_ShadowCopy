import { useState, useEffect, useRef, FormEvent } from "react";
import { sound } from "./utils/audio";
import { SAMPLE_FLAG, isSampleFlag } from "../constants/challenge";
import { EVENT_DATE } from "../constants";

export interface Cadet {
  email: string;
  codename: string;
  solved: boolean;
  timestamp: string;
}

export function useHomeState() {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const [teaserInput, setTeaserInput] = useState("");
  const [teaserStatus, setTeaserStatus] = useState<"idle" | "correct" | "incorrect">("idle");

  const [logs, setLogs] = useState<string[]>([
    "INITIALIZING SECURE SOCKET SHELL v4.8...",
    "ESTABLISHING VPN TUNNEL FOR INGRESS...",
    "RESOLVING TARGET HOST: nullorigin.cyberhx.com [104.21.64.12]",
    "STATUS: LISTENING ON DECRYPT PORTS",
  ]);

  const [registrations, setRegistrations] = useState<Cadet[]>([]);
  const [statusClicks, setStatusClicks] = useState(0);
  const [showAdmin, setShowAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<"database" | "guide">("database");

  // Countdown timer — targets EVENT_DATE (2026-09-18 10:00 IST), the same
  // instant for every viewer. The previous target was midnight in the
  // *viewer's* local zone, so clocks around the world counted to different
  // moments and none matched the real start.
  useEffect(() => {
    const target = EVENT_DATE.getTime();
    let interval = 0;
    const tick = () => {
      const difference = target - Date.now();
      if (difference <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        if (interval) clearInterval(interval);
        return;
      }
      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setTimeLeft({
        days: String(d).padStart(2, "0"),
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
      });
    };
    // Immediate first tick — the hero was showing 00:00:00:00 for the
    // first second while waiting on the interval.
    tick();
    interval = window.setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  // Load registrations from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("null_origin_ctf_roster");
    if (stored) {
      try { setRegistrations(JSON.parse(stored)); } catch (e) {}
    } else {
      const initialRoster: Cadet[] = [
        { email: "neo@cyberhx.com", codename: "NE0_BYPASS", solved: true, timestamp: new Date(Date.now() - 3600000 * 3).toISOString() },
        { email: "trinity@cipher.org", codename: "TR1N1TY", solved: true, timestamp: new Date(Date.now() - 3600000 * 11).toISOString() },
        { email: "acid_burn@nullorigin.com", codename: "ACID_BURN", solved: false, timestamp: new Date(Date.now() - 3600000 * 24).toISOString() },
        { email: "zerocool@nullorigin.com", codename: "ZER0_C00L", solved: true, timestamp: new Date(Date.now() - 3600000 * 38).toISOString() },
      ];
      setRegistrations(initialRoster);
      localStorage.setItem("null_origin_ctf_roster", JSON.stringify(initialRoster));
    }
  }, []);

  // Ambient terminal logs
  useEffect(() => {
    const terminalFeeds = [
      "INGRESS FILTER: Bypassing regional proxy buffers...",
      "SYSTEM ALARM: Port scan detected from trace node 192.16.8.21",
      "SECURE CORE: Cryptographic keys locked within enclave-1A",
      "METADATA CHECK: Verification checksum match: OK",
      "TRANSMISSION LINK: Synchronizing system clock with GPS reference...",
      "FIREWALL NOTICE: Inbound ICMP block active on interface eth0",
      "CTF DEPLOYER: Challenges parsed and integrity validated successfully",
      "SHELL CONTEXT: Operator session granted with restricted sandbox clearances",
    ];
    const interval = setInterval(() => {
      const randomFeed = terminalFeeds[Math.floor(Math.random() * terminalFeeds.length)];
      setLogs((prev) => {
        const next = [...prev, `[${new Date().toLocaleTimeString()}] ${randomFeed}`];
        if (next.length > 5) next.shift();
        return next;
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Handlers
  const handleKeyInteraction = () => { sound.playKey(); };

  const toggleSound = () => {
    const nextState = sound.toggle();
    setAudioEnabled(nextState);
    sound.playClick();
  };

  // Tracked so a wrong-then-right guess inside 2.5s can't have the stale
  // "incorrect" timeout wipe the success state back to idle.
  const teaserTimer = useRef(0);
  useEffect(() => () => window.clearTimeout(teaserTimer.current), []);

  const handleTeaserVerify = (e: FormEvent) => {
    e.preventDefault();
    window.clearTimeout(teaserTimer.current);
    const cleanInput = teaserInput.trim().toLowerCase();
    if (isSampleFlag(cleanInput) || cleanInput.includes(SAMPLE_FLAG.toLowerCase())) {
      setTeaserStatus("correct");
      sound.playSuccess();
      setLogs((prev) => [...prev, `[TEASER SOLVED] Flag decrypted successfully! Decrypted message verified.`]);
    } else {
      setTeaserStatus("incorrect");
      sound.playError();
      teaserTimer.current = window.setTimeout(() => setTeaserStatus("idle"), 2500);
    }
  };

  const handleStatusClick = () => {
    sound.playClick();
    // Side effects live outside the state updater: updaters must be pure,
    // and StrictMode double-invokes them — the admin-panel log line and
    // success sound were firing twice in dev.
    const next = statusClicks + 1;
    if (next >= 5) {
      setStatusClicks(0);
      setShowAdmin(true);
      sound.playSuccess();
      setLogs((prevLogs) => [...prevLogs, `[OVERSEER] Tactical Administrator panel decrypted! Access granted.`]);
    } else {
      setStatusClicks(next);
    }
  };

  const downloadCSV = () => {
    sound.playEnter();
    // Neutralise formula injection: Excel executes cells starting with
    // = + - @ when the CSV is opened, and these values come from storage.
    const csvSafe = (s: string) => (/^[=+\-@]/.test(s) ? `'${s}` : s);
    const headers = "Email,Codename,Teaser Decrypted,Registration Dated\n";
    const body = registrations.map(r =>
      `"${csvSafe(r.email).replace(/"/g, '""')}","${csvSafe(r.codename).replace(/"/g, '""')}","${r.solved ? 'YES' : 'NO'}","${r.timestamp}"`
    ).join("\n");
    const blob = new Blob([headers + body], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `nullorigin_pre_registrations.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const clearDatabase = () => {
    if (window.confirm("Purge the local registries roster?")) {
      sound.playError();
      localStorage.removeItem("null_origin_ctf_roster");
      const defaultRoster = [{ email: "neo@cyberhx.com", codename: "NE0_BYPASS", solved: true, timestamp: new Date().toISOString() }];
      setRegistrations(defaultRoster);
      localStorage.setItem("null_origin_ctf_roster", JSON.stringify(defaultRoster));
    }
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    sound.playEnter();
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return {
    audioEnabled,
    copiedLink,
    timeLeft,
    teaserInput,
    setTeaserInput,
    teaserStatus,
    logs,
    registrations,
    showAdmin,
    activeTab,
    setActiveTab,
    handleKeyInteraction,
    toggleSound,
    handleTeaserVerify,
    handleStatusClick,
    downloadCSV,
    clearDatabase,
    copyShareLink,
  };
}