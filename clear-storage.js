// Script to clear localStorage and ensure fresh start
if (typeof window !== 'undefined') {
  localStorage.removeItem('ie-concierge-storage');
  console.log('✅ Cleared localStorage - welcome screen should now show');
} else {
  console.log('This script should be run in the browser console');
}



