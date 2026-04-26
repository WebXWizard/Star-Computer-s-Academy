type EnrollmentStatus = "pending" | "confirmed" | "cancelled";

type CourseRecord = {
  id: number;
  title: string;
  description: string;
  duration: string;
  fee: string;
  icon: string | null;
  isActive: boolean;
  createdAt: Date;
};

type EnrollmentRecord = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  course: string;
  message: string | null;
  status: EnrollmentStatus;
  createdAt: Date;
};

type ContactRecord = {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
  message: string;
  createdAt: Date;
};

type TestimonialRecord = {
  id: number;
  studentName: string;
  course: string;
  review: string;
  rating: number;
  isActive: boolean;
  createdAt: Date;
};

class FallbackStore {
  private courseId = 7;
  private enrollmentId = 1;
  private contactId = 1;
  private testimonialId = 4;

  private courses: CourseRecord[] = [
    {
      id: 1,
      title: "Entry Level | Basic Courses for Beginners",
      description: "BCC, DCA, ADCA, PGDCA and other beginner-friendly computer courses.",
      duration: "6-12 Months",
      fee: "Contact for fee",
      icon: "BookOpen",
      isActive: true,
      createdAt: new Date("2026-01-01T00:00:00.000Z"),
    },
    {
      id: 2,
      title: "Programming Courses for Absolute Beginners",
      description: "Python, Java, JavaScript and beginner programming fundamentals.",
      duration: "6-18 Months",
      fee: "Contact for fee",
      icon: "BookOpen",
      isActive: true,
      createdAt: new Date("2026-01-02T00:00:00.000Z"),
    },
    {
      id: 3,
      title: "Web Development Courses",
      description: "HTML, CSS, JavaScript, Express, Node, React and practical web projects.",
      duration: "3-12 Months",
      fee: "Contact for fee",
      icon: "BookOpen",
      isActive: true,
      createdAt: new Date("2026-01-03T00:00:00.000Z"),
    },
    {
      id: 4,
      title: "NIELIT Offered Courses",
      description: "BCC, O'Level, CCC and other NIELIT-focused certification courses.",
      duration: "6-12 Months",
      fee: "Contact for fee",
      icon: "BookOpen",
      isActive: true,
      createdAt: new Date("2026-01-04T00:00:00.000Z"),
    },
    {
      id: 5,
      title: "Digital Marketing & Graphic Design Courses",
      description: "Marketing, SEO, Adobe tools, animation and creative digital skills.",
      duration: "6-10 Months",
      fee: "Contact for fee",
      icon: "BookOpen",
      isActive: true,
      createdAt: new Date("2026-01-05T00:00:00.000Z"),
    },
    {
      id: 6,
      title: "Skill India Certification Courses",
      description: "Data Entry, Angular and Python Fullstack certification-oriented training.",
      duration: "3-6 Months",
      fee: "Contact for fee",
      icon: "BookOpen",
      isActive: true,
      createdAt: new Date("2026-01-06T00:00:00.000Z"),
    },
  ];

  private enrollments: EnrollmentRecord[] = [];
  private contacts: ContactRecord[] = [];
  private testimonials: TestimonialRecord[] = [
    {
      id: 1,
      studentName: "Aman Verma",
      course: "Basic Computer Course",
      review: "Very supportive teachers and practical classes. I gained confidence quickly.",
      rating: 5,
      isActive: true,
      createdAt: new Date("2026-01-06T00:00:00.000Z"),
    },
    {
      id: 2,
      studentName: "Pooja Singh",
      course: "MS Word, Excel & PowerPoint",
      review: "The Excel part was especially useful for my office work.",
      rating: 5,
      isActive: true,
      createdAt: new Date("2026-01-07T00:00:00.000Z"),
    },
    {
      id: 3,
      studentName: "Rohit Yadav",
      course: "CCC Preparation",
      review: "Simple teaching style and regular practice helped me a lot.",
      rating: 4,
      isActive: true,
      createdAt: new Date("2026-01-08T00:00:00.000Z"),
    },
  ];

  listCourses() {
    return [...this.courses].sort((a, b) => a.id - b.id);
  }

  createCourse(input: Omit<CourseRecord, "id" | "createdAt">) {
    const created: CourseRecord = {
      ...input,
      id: this.courseId++,
      createdAt: new Date(),
    };
    this.courses.push(created);
    return created;
  }

  updateCourse(id: number, updates: Partial<Omit<CourseRecord, "id" | "createdAt">>) {
    const idx = this.courses.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    this.courses[idx] = { ...this.courses[idx], ...updates };
    return this.courses[idx];
  }

  deleteCourse(id: number) {
    this.courses = this.courses.filter((c) => c.id !== id);
  }

  listEnrollments() {
    return [...this.enrollments].sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
    );
  }

  createEnrollment(input: Omit<EnrollmentRecord, "id" | "createdAt" | "status">) {
    const created: EnrollmentRecord = {
      ...input,
      id: this.enrollmentId++,
      status: "pending",
      createdAt: new Date(),
    };
    this.enrollments.push(created);
    return created;
  }

  updateEnrollmentStatus(id: number, status: EnrollmentStatus) {
    const idx = this.enrollments.findIndex((e) => e.id === id);
    if (idx === -1) return null;
    this.enrollments[idx] = { ...this.enrollments[idx], status };
    return this.enrollments[idx];
  }

  deleteEnrollment(id: number) {
    this.enrollments = this.enrollments.filter((e) => e.id !== id);
  }

  listContacts() {
    return [...this.contacts].sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
    );
  }

  createContact(input: Omit<ContactRecord, "id" | "createdAt">) {
    const created: ContactRecord = {
      ...input,
      id: this.contactId++,
      createdAt: new Date(),
    };
    this.contacts.push(created);
    return created;
  }

  deleteContact(id: number) {
    this.contacts = this.contacts.filter((c) => c.id !== id);
  }

  listTestimonials() {
    return [...this.testimonials].sort((a, b) => a.id - b.id);
  }

  createTestimonial(input: Omit<TestimonialRecord, "id" | "createdAt">) {
    const created: TestimonialRecord = {
      ...input,
      id: this.testimonialId++,
      createdAt: new Date(),
    };
    this.testimonials.push(created);
    return created;
  }

  deleteTestimonial(id: number) {
    this.testimonials = this.testimonials.filter((t) => t.id !== id);
  }

  stats() {
    return {
      totalEnrollments: this.enrollments.length,
      pendingEnrollments: this.enrollments.filter((e) => e.status === "pending")
        .length,
      confirmedEnrollments: this.enrollments.filter((e) => e.status === "confirmed")
        .length,
      totalContacts: this.contacts.length,
      totalCourses: this.courses.length,
      totalTestimonials: this.testimonials.length,
    };
  }
}

const CONNECTION_ERROR_CODES = new Set([
  "ECONNREFUSED",
  "ENOTFOUND",
  "ETIMEDOUT",
  "ECONNRESET",
  "EHOSTUNREACH",
  "57P01",
]);

function collectErrorCodes(error: unknown, out: Set<string>) {
  if (!error || typeof error !== "object") return;

  const asAny = error as Record<string, unknown>;
  const code = asAny["code"];
  if (typeof code === "string") out.add(code);

  const cause = asAny["cause"];
  if (cause) collectErrorCodes(cause, out);

  const errors = asAny["errors"];
  if (Array.isArray(errors)) {
    for (const item of errors) {
      collectErrorCodes(item, out);
    }
  }
}

export function isDatabaseUnavailable(error: unknown): boolean {
  const codes = new Set<string>();
  collectErrorCodes(error, codes);
  if ([...codes].some((code) => CONNECTION_ERROR_CODES.has(code))) {
    return true;
  }

  const message =
    error instanceof Error ? error.message : typeof error === "string" ? error : "";
  return /ECONNREFUSED|ENOTFOUND|database|connect/i.test(message);
}

let fallbackNoticePrinted = false;

export function logFallbackMode(context: string, error: unknown) {
  if (!fallbackNoticePrinted) {
    fallbackNoticePrinted = true;
    console.warn(
      "[api-server] Database is unavailable. Using in-memory fallback store for development.",
    );
  }

  if (error instanceof Error) {
    console.warn(`[api-server][fallback:${context}] ${error.name} ${error.message}`);
  } else {
    console.warn(`[api-server][fallback:${context}]`, error);
  }
}

export const fallbackStore = new FallbackStore();

