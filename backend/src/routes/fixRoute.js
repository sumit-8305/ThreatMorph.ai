import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Scan from "../models/scans.js";

const router = express.Router();

// Stub function to simulate fix execution
import axios from "axios";

async function runFixes(fixes) {
  const executed = [];

  for (const fix of fixes) {
    try {
      const response = await axios.post("https://threatmorph-ai-1.onrender.com/generatefix", {
        service: fix.service,
        resource: fix.resource,
        action: fix.action,
        description: fix.description,
      });
      
      executed.push({
        resource: fix.resource,
        action: fix.action,
        status: "success",
        script: response.data.script || "No script generated",
      });
    } catch (err) {
      console.error(`Fix generation failed for ${fix.resource}:`, err.message);
      executed.push({
        resource: fix.resource,
        action: fix.action,
        status: "failed",
        error: err.message,
      });
    }
  }

  return executed;
}


// POST /api/fix/:scanId - Auto-fix endpoint
router.post("/fix/:scanId", protect, async (req, res) => {
  try {
    const scanId = req.params.scanId;

    // Find the scan
    const scan = await Scan.findById(scanId);
    if (!scan) {
      return res.status(404).json({ message: "Scan not found" });
    }

    // Check ownership
    if (scan.user.toString() !== req.user) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Ensure there are fixes to apply
    const { fixes } = scan;
    if (!fixes || fixes.length === 0) {
      return res.status(400).json({ message: "No fixes available for this scan" });
    }

    // Simulate execution of fixes
    const results = await runFixes(fixes);

    // Optionally mark as fixed
    scan.fixesApplied = true;
    await scan.save();

    return res.status(200).json({ message: "Fixes executed", results });
  } catch (err) {
    console.error("Fix error:", err.message);
    return res.status(500).json({ message: "Fixing process failed" });
  }
});

export default router;
