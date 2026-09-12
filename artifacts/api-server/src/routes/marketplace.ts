import { Router, type IRouter } from "express";
import {
  CheckAvailabilityQueryParams,
  CheckAvailabilityResponse,
  CreateBidBody,
  CreateBidParams,
  CreateBidResponse,
  CreateBookingBody,
  CreateBookingResponse,
  CreateRequestBody,
  CreateRequestResponse,
  GetOwnerSummaryResponse,
  GetRequestParams,
  GetRequestResponse,
  GetVenueParams,
  GetVenueResponse,
  HandoffConversationParams,
  HandoffConversationResponse,
  ListMessagesParams,
  ListMessagesResponse,
  ListRequestsResponse,
  ListVenuesQueryParams,
  ListVenuesResponse,
  SendMessageBody,
  SendMessageParams,
  SendMessageResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

const venues = [
  {
    id: "venue-1",
    name: "The Olive Courtyard",
    area: "Gulberg III",
    city: "Lahore",
    capacity: 550,
    startingPrice: 285000,
    rating: 4.9,
    reviewCount: 128,
    verified: true,
    imageUrl:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85",
    amenities: ["AC", "Bridal room", "Valet parking", "Catering"],
    tags: ["Courtyard", "Garden", "Luxury"],
    lat: 31.5204,
    lng: 74.3587,
    availability: "limited",
    description:
      "A light-filled courtyard venue with old-Lahore character, polished service, and flexible menus for celebrations that run late.",
    gallery: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1200&q=85",
    ],
    policy: {
      summary:
        "Flexible changes up to 30 days before the event, with a clear tiered refund schedule.",
      tiers: [
        { label: "30+ days before", refund: "90% refund", cutoff: "30 days" },
        { label: "15–29 days before", refund: "50% refund", cutoff: "15 days" },
        { label: "Under 15 days", refund: "Advance retained", cutoff: "14 days" },
      ],
    },
  },
  {
    id: "venue-2",
    name: "Noor Banquet",
    area: "DHA Phase 5",
    city: "Lahore",
    capacity: 800,
    startingPrice: 410000,
    rating: 4.8,
    reviewCount: 94,
    verified: true,
    imageUrl:
      "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=85",
    amenities: ["AC", "Stage decor", "Generator", "Food stalls"],
    tags: ["Grand hall", "Modern", "Full service"],
    lat: 31.4697,
    lng: 74.3875,
    availability: "open",
    description:
      "A high-ceiling banquet hall built for big guest lists, with in-house production and an experienced wedding team.",
    gallery: [
      "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=85",
    ],
    policy: {
      summary:
        "Date changes are available once without penalty when requested 21 days in advance.",
      tiers: [
        { label: "21+ days before", refund: "80% refund", cutoff: "21 days" },
        { label: "8–20 days before", refund: "35% refund", cutoff: "8 days" },
        { label: "Under 8 days", refund: "Advance retained", cutoff: "7 days" },
      ],
    },
  },
  {
    id: "venue-3",
    name: "Mosaic House",
    area: "Bahria Town",
    city: "Lahore",
    capacity: 320,
    startingPrice: 195000,
    rating: 4.7,
    reviewCount: 61,
    verified: true,
    imageUrl:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85",
    amenities: ["Bridal room", "DJ / sound", "Floral decor", "Parking"],
    tags: ["Intimate", "Contemporary", "Value"],
    lat: 31.3696,
    lng: 74.1845,
    availability: "open",
    description:
      "A considered, intimate space for smaller celebrations with strong decor partners and a calm, hands-on planning team.",
    gallery: [
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85",
    ],
    policy: {
      summary:
        "A straightforward policy with the option to move your date once at no extra venue fee.",
      tiers: [
        { label: "30+ days before", refund: "90% refund", cutoff: "30 days" },
        { label: "15–29 days before", refund: "60% refund", cutoff: "15 days" },
        { label: "Under 15 days", refund: "Advance retained", cutoff: "14 days" },
      ],
    },
  },
];

const requests = [
  {
    id: "request-1",
    eventType: "Wedding",
    date: "2026-10-24",
    guests: 420,
    area: "Gulberg / DHA",
    budgetMin: 240000,
    budgetMax: 340000,
    amenities: ["AC", "Catering", "Valet parking"],
    status: "reviewing",
    bidCount: 6,
    createdAt: "2026-09-08T09:30:00.000Z",
    note: "Elegant evening walima with a live food station and room for a 20ft stage.",
  },
];

const bids = [
  {
    id: "bid-1",
    requestId: "request-1",
    venueId: "venue-1",
    venueName: "The Olive Courtyard",
    amount: 298000,
    guestCount: 420,
    inclusions: ["Hall rental", "Dinner buffet", "Valet parking", "Generator"],
    status: "shortlisted",
    createdAt: "2026-09-09T11:00:00.000Z",
    note: "We can include a complimentary welcome tea station for your guests.",
  },
  {
    id: "bid-2",
    requestId: "request-1",
    venueId: "venue-2",
    venueName: "Noor Banquet",
    amount: 326000,
    guestCount: 420,
    inclusions: ["Hall rental", "Premium buffet", "Stage decor", "Sound system"],
    status: "submitted",
    createdAt: "2026-09-10T14:20:00.000Z",
    note: "Our in-house production team can coordinate the stage and lighting end to end.",
  },
];

const messages = [
  {
    id: "message-1",
    conversationId: "conversation-1",
    sender: "ai",
    text: "Hi, I’m the Olive Courtyard concierge. I can help with packages, availability, and what’s included in your quote.",
    createdAt: "2026-09-12T08:00:00.000Z",
  },
  {
    id: "message-2",
    conversationId: "conversation-1",
    sender: "client",
    text: "Can the courtyard fit a 420-person walima with a stage?",
    createdAt: "2026-09-12T08:03:00.000Z",
  },
  {
    id: "message-3",
    conversationId: "conversation-1",
    sender: "ai",
    text: "Yes. The standard layout fits up to 550 guests, and the team can reserve a 20ft stage zone. I can also connect you to the manager for a custom floor plan.",
    createdAt: "2026-09-12T08:03:30.000Z",
  },
];

const bookings = [
  {
    id: "booking-1",
    venueId: "venue-1",
    date: "2026-10-24",
    slot: "evening",
    guests: 420,
    amount: 298000,
    status: "pending_payment",
    liabilityAccepted: true,
    createdAt: "2026-09-11T10:00:00.000Z",
  },
];

const ownerSummary = {
  venueName: "The Olive Courtyard",
  profileComplete: 86,
  monthlyViews: 1840,
  openRequests: 12,
  upcomingBookings: 8,
  pendingRevenue: 1420000,
  recentActivity: [
    "New RFP match: October walima in Gulberg",
    "Ayesha Khan accepted your custom package",
    "Gallery viewed 84 times this week",
  ],
};

router.get("/venues", (req, res): void => {
  const parsed = ListVenuesQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { eventType, area, guestCount, budget } = parsed.data;
  const filtered = venues.filter((venue) => {
    const matchesArea =
      !area || venue.area.toLowerCase().includes(area.toLowerCase());
    const matchesGuests = !guestCount || venue.capacity >= guestCount;
    const matchesBudget = !budget || venue.startingPrice <= budget;
    const matchesEvent =
      !eventType ||
      eventType === "other" ||
      (eventType === "wedding" && venue.tags.some((tag) => tag === "Luxury" || tag === "Grand hall")) ||
      eventType !== "wedding";
    return matchesArea && matchesGuests && matchesBudget && matchesEvent;
  });
  res.json(ListVenuesResponse.parse(filtered));
});

router.get("/venues/:venueId", (req, res): void => {
  const params = GetVenueParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const venue = venues.find((item) => item.id === params.data.venueId);
  if (!venue) {
    res.status(404).json({ error: "Venue not found" });
    return;
  }
  res.json(GetVenueResponse.parse(venue));
});

router.get("/owner/summary", (_req, res): void => {
  res.json(GetOwnerSummaryResponse.parse(ownerSummary));
});

router.get("/requests", (_req, res): void => {
  res.json(ListRequestsResponse.parse(requests));
});

router.post("/requests", (req, res): void => {
  const parsed = CreateRequestBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const input = parsed.data;
  const request = {
    id: `request-${requests.length + 1}`,
    eventType: input.eventType,
    date: input.date.toISOString().slice(0, 10),
    guests: input.guests,
    area: input.area,
    budgetMin: input.budgetMin,
    budgetMax: input.budgetMax,
    amenities: input.amenities ?? [],
    status: "open" as const,
    bidCount: 0,
    createdAt: new Date().toISOString(),
    note: input.note ?? "",
  };
  requests.unshift(request);
  res.status(201).json(CreateRequestResponse.parse(request));
});

router.get("/requests/:requestId", (req, res): void => {
  const params = GetRequestParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const request = requests.find((item) => item.id === params.data.requestId);
  if (!request) {
    res.status(404).json({ error: "Request not found" });
    return;
  }
  res.json(
    GetRequestResponse.parse({
      ...request,
      bids: bids.filter((bid) => bid.requestId === request.id),
    }),
  );
});

router.post("/requests/:requestId/bids", (req, res): void => {
  const params = CreateBidParams.safeParse(req.params);
  const parsed = CreateBidBody.safeParse(req.body);
  if (!params.success || !parsed.success) {
    res.status(400).json({ error: "Invalid bid details" });
    return;
  }
  const venue = venues.find((item) => item.id === parsed.data.venueId);
  if (!venue) {
    res.status(404).json({ error: "Venue not found" });
    return;
  }
  const request = requests.find((item) => item.id === params.data.requestId);
  if (!request) {
    res.status(404).json({ error: "Request not found" });
    return;
  }
  const bid = {
    id: `bid-${bids.length + 1}`,
    requestId: request.id,
    venueId: venue.id,
    venueName: venue.name,
    amount: parsed.data.amount,
    guestCount: parsed.data.guestCount,
    inclusions: parsed.data.inclusions,
    status: "submitted" as const,
    createdAt: new Date().toISOString(),
    note: parsed.data.note ?? "",
  };
  bids.push(bid);
  request.bidCount += 1;
  res.status(201).json(CreateBidResponse.parse(bid));
});

router.get("/availability", (req, res): void => {
  const raw = req.query;
  const parsed = CheckAvailabilityQueryParams.safeParse({
    ...raw,
    date: new Date(String(raw.date)),
  });
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const isBooked = bookings.some(
    (booking) =>
      booking.venueId === parsed.data.venueId &&
      booking.date === parsed.data.date.toISOString().slice(0, 10) &&
      (booking.slot === parsed.data.slot || booking.slot === "full_day"),
  );
  const status = isBooked ? "confirmed" : parsed.data.slot === "evening" ? "reserved" : "available";
  res.json(
    CheckAvailabilityResponse.parse({
      venueId: parsed.data.venueId,
      date: parsed.data.date,
      slot: parsed.data.slot,
      status,
      message: isBooked ? "This slot is already confirmed." : "This slot is available to request.",
    }),
  );
});

router.post("/bookings", (req, res): void => {
  const parsed = CreateBookingBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  if (!parsed.data.liabilityAccepted) {
    res.status(400).json({ error: "Cancellation liability must be accepted before booking." });
    return;
  }
  const date = parsed.data.date.toISOString().slice(0, 10);
  const isBooked = bookings.some(
    (booking) =>
      booking.venueId === parsed.data.venueId &&
      booking.date === date &&
      (booking.slot === parsed.data.slot || booking.slot === "full_day"),
  );
  if (isBooked) {
    res.status(409).json({ error: "This slot is no longer available." });
    return;
  }
  const booking = {
    id: `booking-${bookings.length + 1}`,
    venueId: parsed.data.venueId,
    date,
    slot: parsed.data.slot,
    guests: parsed.data.guests,
    amount: parsed.data.amount,
    status: "pending_payment" as const,
    liabilityAccepted: true,
    createdAt: new Date().toISOString(),
  };
  bookings.push(booking);
  res.status(201).json(CreateBookingResponse.parse(booking));
});

router.get("/conversations/:conversationId/messages", (req, res): void => {
  const params = ListMessagesParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  res.json(
    ListMessagesResponse.parse(
      messages.filter((message) => message.conversationId === params.data.conversationId),
    ),
  );
});

router.post("/conversations/:conversationId/messages", (req, res): void => {
  const params = SendMessageParams.safeParse(req.params);
  const parsed = SendMessageBody.safeParse(req.body);
  if (!params.success || !parsed.success) {
    res.status(400).json({ error: "Message text is required." });
    return;
  }
  const message = {
    id: `message-${messages.length + 1}`,
    conversationId: params.data.conversationId,
    sender: "client" as const,
    text: parsed.data.text,
    createdAt: new Date().toISOString(),
  };
  messages.push(message);
  messages.push({
    id: `message-${messages.length + 1}`,
    conversationId: params.data.conversationId,
    sender: "ai" as const,
    text: "I’ve noted that. I can answer package and availability questions, or bring in the venue manager if you’d like a custom quote.",
    createdAt: new Date(Date.now() + 500).toISOString(),
  });
  res.status(201).json(SendMessageResponse.parse(message));
});

router.post("/conversations/:conversationId/handoff", (req, res): void => {
  const params = HandoffConversationParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  res.json(
    HandoffConversationResponse.parse({
      conversationId: params.data.conversationId,
      status: "waiting_for_manager",
      message: "A venue manager has been notified and will join this conversation shortly.",
    }),
  );
});

export default router;