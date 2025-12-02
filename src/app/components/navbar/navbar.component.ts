import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  isMobileMenuOpen = false;
  activeSection = 'hero';

  ngOnInit(): void {
    this.updateActiveSection();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // Détecte si la page a scrollé pour ajouter l'effet
    this.isScrolled = window.pageYOffset > 50;
    
    // Met à jour la section active
    this.updateActiveSection();
  }

  updateActiveSection(): void {
    const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
    const scrollPosition = window.pageYOffset + 100; // Offset pour meilleure détection

    for (const sectionId of sections) {
      const section = document.getElementById(sectionId);
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          this.activeSection = sectionId;
          break;
        }
      }
    }

    // Si on est tout en haut de la page
    if (window.pageYOffset < 100) {
      this.activeSection = 'hero';
    }
  }

  isActive(section: string): boolean {
    return this.activeSection === section;
  }

  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault();
    
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // 80px pour la hauteur de la navbar
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });

      // Ferme le menu mobile après le clic
      if (this.isMobileMenuOpen) {
        this.toggleMobileMenu();
      }

      // Met à jour immédiatement la section active
      this.activeSection = sectionId;
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}