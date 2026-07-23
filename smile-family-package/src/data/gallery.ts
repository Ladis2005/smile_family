import type { GalleryItem } from '@/types';

/**
 * Galeria da clínica.
 *
 * As imagens reais devem ser colocadas em /public/images/gallery e o campo
 * `src` preenchido (ver /public/images/README.md). Enquanto `src` estiver
 * indefinido, é mostrado um placeholder por gradiente com o rótulo.
 */
export const gallery: GalleryItem[] = [
  {
    id: 'recepcao',
    // src: '/images/gallery/recepcao.jpg',
    alt: 'Receção da clínica Smile Family',
    caption: 'Receção',
  },
  {
    id: 'consultorio',
    // src: '/images/gallery/consultorio.jpg',
    alt: 'Consultório equipado da Smile Family',
    caption: 'Consultório',
  },
  {
    id: 'equipamentos',
    // src: '/images/gallery/equipamentos.jpg',
    alt: 'Equipamentos odontológicos modernos',
    caption: 'Equipamentos',
  },
  {
    id: 'equipa',
    // src: '/images/gallery/equipa.jpg',
    alt: 'Equipa de profissionais da Smile Family',
    caption: 'Equipa',
  },
  {
    id: 'atendimento',
    // src: '/images/gallery/atendimento.jpg',
    alt: 'Atendimento a um paciente na Smile Family',
    caption: 'Atendimento',
  },
  {
    id: 'ambiente',
    // src: '/images/gallery/ambiente.jpg',
    alt: 'Ambiente interno confortável da clínica',
    caption: 'Ambiente interno',
  },
];
