import React from 'react';
import { REVIEWS } from '../data.ts';
import { Review } from '../types.ts';
import { Star, ChevronLeft, ChevronRight, MessageSquareCode, Quote, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Reviews() {
  const [reviewsList, setReviewsList] = React.useState<Review[]>(REVIEWS);
  const [activeIndex, setActiveIndex] = React.useState(0);
  
  // Submit new review form fields
  const [authorName, setAuthorName] = React.useState('');
  const [rating, setRating] = React.useState(5);
  const [treatment, setTreatment] = React.useState('Porcelain Veneers');
  const [reviewText, setReviewText] = React.useState('');
  const [feedback, setFeedback] = React.useState('');

  const treatments = [
    'Porcelain Veneers',
    'Atelier Zoom Whitening',
    'Elite Dental Implants',
    'Aesthetic Crowns',
    'Therapeutic Wellness Hygiene',
    'Invisalign Precision'
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviewsList.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviewsList.length) % reviewsList.length);
  };

  const currentReview = reviewsList[activeIndex] || reviewsList[0];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !reviewText) {
      setFeedback('Kindly provide your name and review remarks.');
      return;
    }

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      author: authorName,
      rating,
      text: reviewText,
      date: 'Today',
      treatment,
      verified: true
    };

    const updated = [newReview, ...reviewsList];
    setReviewsList(updated);
    setActiveIndex(0); // View the newest instantly
    
    // reset form fields
    setAuthorName('');
    setReviewText('');
    setFeedback('Thank you! Your verified client diary has been logged.');
    setTimeout(() => setFeedback(''), 5000);
  };

  return (
    <section className="py-16 bg-[#FBF9F6]" id="client-reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title sections */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="text-[10px] tracking-[0.3em] font-mono text-[#8D775F] uppercase font-bold">
            PATIENT NARRATIVES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#0E2E28] tracking-tight">
            The Ivory Service Diary
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            At our clinic, client narratives represent our ultimate clinical certificate. Hear from corporate leaders, artists, and wellness seekers who have unlocked exceptional transformations.
          </p>
        </div>

        {/* Carousel Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">
          
          {/* Left Panel: Carousel Slider (8 columns) */}
          <div className="lg:col-span-7 bg-white p-8 rounded-sm border border-stone-200/60 shadow-xs relative overflow-hidden min-h-[380px] flex flex-col justify-between">
            {/* Decors */}
            <Quote className="absolute -top-6 -right-6 w-32 h-32 text-stone-100/50 rotate-12 stroke-1" />

            <div className="space-y-6 z-10">
              <div className="flex items-center space-x-2">
                <span className="block text-[10px] uppercase font-mono tracking-wider font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-xs flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 mr-1.5" />
                  <span>Verified Ivory Patient</span>
                </span>
                <span className="text-stone-400 text-xs font-mono">• {currentReview.date}</span>
              </div>

              {/* Stars rendering */}
              <div className="flex items-center text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4.5 h-4.5 ${i < currentReview.rating ? 'fill-current' : 'text-stone-200'}`} 
                  />
                ))}
              </div>

              {/* Testimonial text with animation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReview.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="font-sans text-stone-700 text-sm sm:text-base leading-relaxed italic pr-4">
                    &ldquo;{currentReview.text}&rdquo;
                  </p>
                  
                  <div className="mt-6">
                    <h4 className="font-serif text-base text-[#0E2E28] font-semibold">
                      {currentReview.author}
                    </h4>
                    <span className="text-[11px] font-mono text-[#8D775F] uppercase tracking-wider font-bold">
                      Treatment: {currentReview.treatment}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider triggers */}
            <div className="flex items-center space-x-3 pt-6 border-t border-stone-100 mt-6 z-10 justify-between">
              <span className="text-xs font-mono text-stone-400">
                Diary {activeIndex + 1} of {reviewsList.length}
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrev}
                  className="p-2 border border-stone-200 hover:border-[#8D775F] text-stone-600 hover:text-[#0E2E28] rounded-full hover:bg-stone-50 cursor-pointer transition-colors"
                  id="reviews-prev"
                >
                  <ChevronLeft className="w-4.5 h-4.5" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 border border-stone-200 hover:border-[#8D775F] text-stone-600 hover:text-[#0E2E28] rounded-full hover:bg-stone-50 cursor-pointer transition-colors"
                  id="reviews-next"
                >
                  <ChevronRight className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Right Panel: custom interactive add-review card (5 columns) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-sm border border-stone-200/80 shadow-xs space-y-4">
            <div className="flex items-center space-x-2 border-b border-stone-100 pb-3">
              <Sparkles className="w-4.5 h-4.5 text-[#8D775F] animate-pulse" />
              <h3 className="font-serif text-lg text-[#0E2E28] font-semibold">
                Share Your Diary
              </h3>
            </div>

            {feedback && (
              <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-800 text-[11px] rounded-xs flex items-center space-x-2" id="feedback-alert">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{feedback}</span>
              </div>
            )}

            <form onSubmit={handleReviewSubmit} className="space-y-4" id="review-submit-form">
              
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono font-medium text-stone-500 tracking-wider">
                  Your Full Name:
                </label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Isabella Vanderbilt"
                  className="w-full text-xs p-3 bg-[#FBF9F6] border border-stone-200/50 rounded-xs focus:ring-1 focus:ring-[#8D775F] focus:border-[#8D775F] outline-hidden placeholder:text-stone-400 font-sans"
                  id="review-name"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono font-medium text-stone-500 tracking-wider">
                    Treatment Selection:
                  </label>
                  <select
                    value={treatment}
                    onChange={(e) => setTreatment(e.target.value)}
                    className="w-full text-xs p-3 bg-[#FBF9F6] border border-stone-200/50 rounded-xs focus:ring-1 focus:ring-[#8D775F] focus:outline-hidden focus:border-[#8D775F] font-sans"
                    id="review-treatment"
                  >
                    {treatments.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono font-medium text-stone-500 tracking-wider">
                    Rating Score:
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                    className="w-full text-xs p-3 bg-[#FBF9F6] border border-stone-200/50 rounded-xs focus:ring-1 focus:ring-[#8D775F] focus:outline-hidden focus:border-[#8D775F] font-sans font-bold"
                    id="review-rating"
                  >
                    <option value="5">5 Stars (Elite Service)</option>
                    <option value="4">4 Stars (Excellent)</option>
                    <option value="3">3 Stars (Satisfactory)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono font-medium text-stone-500 tracking-wider">
                  Describe your aesthetic journey:
                </label>
                <textarea
                  rows={3}
                  required
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="I am astonished by the pain-free veneers... Dr. Amelia was wonderful..."
                  className="w-full text-xs p-3 bg-[#FBF9F6] border border-stone-200/50 rounded-xs focus:ring-1 focus:ring-[#8D775F] focus:border-[#8D775F] outline-hidden placeholder:text-stone-400 font-sans resize-none"
                  id="review-text"
                />
              </div>

              <button
                type="submit"
                id="btn-review-submit"
                className="w-full bg-[#0E2E28] hover:bg-[#8D775F] text-white py-3.5 px-4 rounded-sm text-xs font-semibold tracking-widest uppercase transition-all duration-300 cursor-pointer text-center flex items-center justify-center space-x-2 shadow-xs"
              >
                <span>Publish Experience</span>
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
