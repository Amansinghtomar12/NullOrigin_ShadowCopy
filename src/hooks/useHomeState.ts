import { useState, useEffect, FormEvent } from "react";
import { sound } from "./utils/audio";

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

  // Countdown timer — fixed target: September 18, 2026, 00:00:00 (local time)
  useEffect(() => {
    const targetDate = new Date(2026, 8, 18, 0, 0, 0); // month is 0-indexed: 8 = September
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;
      if (difference <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        clearInterval(interval);
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
    }, 1000);
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

  const handleTeaserVerify = (e: FormEvent) => {
    e.preventDefault();
    const cleanInput = teaserInput.trim().toLowerCase();
    if (cleanInput.includes("flag{nh11_rot13_d3c0d3}") || cleanInput === "flag{nh11_rot13_d3c0d3}") {
      setTeaserStatus("correct");
      sound.playSuccess();
      setLogs((prev) => [...prev, `[TEASER SOLVED] Flag decrypted successfully! Decrypted message verified.`]);
    } else {
      setTeaserStatus("incorrect");
      sound.playError();
      setTimeout(() => setTeaserStatus("idle"), 2500);
    }
  };

  const handleStatusClick = () => {
    sound.playClick();
    setStatusClicks((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        setShowAdmin(true);
        sound.playSuccess();
        setLogs((prevLogs) => [...prevLogs, `[OVERSEER] Tactical Administrator panel decrypted! Access granted.`]);
        return 0;
      }
      return next;
    });
  };

  const downloadCSV = () => {
    sound.playEnter();
    const headers = "Email,Codename,Teaser Decrypted,Registration Dated\n";
    const body = registrations.map(r =>
      `"${r.email.replace(/"/g, '""')}","${r.codename.replace(/"/g, '""')}","${r.solved ? 'YES' : 'NO'}","${r.timestamp}"`
    ).join("\n");
    const blob = new Blob([headers + body], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `nullorigin_pre_registrations.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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