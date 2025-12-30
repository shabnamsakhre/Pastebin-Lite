const pasteModel = require('./../models/pastes.model')

// Health Check
const healthzController = async (req, res) => {
    try {
        await pasteModel.findOne();

        res.status(200).json(
            { ok: true }
        );
    }
    catch (err) {
        console.log("Error: ", err);

        res.status(500).json(
            { ok: false }
        );
    }
}


// Create a paste
const pasteContoller = async (req, res) => {
    const { content, ttl_seconds, max_views } = req.body;

    // --- Validation ---

    // Content
    if (!content.trim() || typeof content !== "string") {
        return res.status(400).json({
            error: "Content is required and must be a non‐empty string"
        })
    }

    // ttl_seconds
    if (ttl_seconds !== "") {
        if (ttl_seconds < 1 || isNaN(Number(ttl_seconds))) {
            return res.status(400).json({
                error: "ttl_seconds must be an integer ≥ 1"
            })
        }
    }

    // max_views
    if (max_views !== "") {
        if (max_views < 1 || isNaN(Number(max_views))) {
            return res.status(400).json({
                error: "max_views must be an integer ≥ 1"
            })
        }
    }

    // Create new paste in Database
    const paste = await pasteModel.create({
        content: content.trim(),
        ttl_seconds: ttl_seconds ?? null,
        max_views: max_views ?? null
    });

    const baseURL = `${req.protocol}://${req.host}`;

    res.status(201).json({
        id: paste._id,
        url: `${baseURL}/p/${paste._id}`
    })
}


// Fetch a paste (API)
const getPasteController = async (req, res) => {
    const { id } = req.params;

    // Fetch the paste using id
    const paste = await pasteModel.findById(id);

    if (!paste) {
        res.status(404).json({
            error: "Paste not found"
        })
    }

    // Determine current time (test mode supported)
    const now = process.env.TEST_MODE === '1' && req.headers['x-test-now-ms']
        ? Number(req.headers['x-test-now-ms'])
        : Date.now();

    // TTL check
    let expiresAt = null;
    if (paste.ttl_seconds) {
        expiresAt = paste.createdAt.getTime() + paste.ttl_seconds * 1000;

        if (now >= expiresAt) {
            return res.status(404).json({
                error: "Paste expired"
            });
        }
    }

    // View count check
    if (paste.max_views !== null) {
        if (paste.max_views <= 0) {
            return res.status(404).json({
                error: "View limit exceeded"
            });
        }

        paste.max_views -= 1;
        await paste.save();
    }

    res.status(200).json({
        content: paste.content,
        remaining_views: paste.max_views,
        expires_at: expiresAt ? new Date(expiresAt).toISOString() : null
    });
}


// View a paste (HTML)
const getViewPasteController = async (req, res) => {
    const { id } = req.params;

    // Fetch the paste using id
    const paste = await pasteModel.findById(id);

    console.log(paste);


    if (!paste) {
        return res.status(404).send("Not Found");
    }

    // Determine current time (test mode supported)
    const now = process.env.TEST_MODE === '1' && req.headers['x-test-now-ms']
        ? Number(req.headers['x-test-now-ms'])
        : Date.now();

    // TTL check
    if (paste.ttl_seconds) {
        const expiresAt = paste.createdAt.getTime() + paste.ttl_seconds * 1000;

        if (now >= expiresAt) {
            return res.status(404).send("Not Found");
        }
    }

    // View count check
    if (paste.max_views !== null) {
        if (paste.max_views <= 0) {
            return res.status(404).send("View Not Found");
        }

        paste.max_views -= 1;
        await paste.save();
    }

    // Content rendering
    res.status(200).send(`
        <html>
          <body>
            <pre>${paste.content.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>
          </body>
        </html>
    `);
}

module.exports = { healthzController, pasteContoller, getPasteController, getViewPasteController };
