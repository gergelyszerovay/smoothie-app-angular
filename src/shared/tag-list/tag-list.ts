import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Tag } from '@shared/tag/tag';
import { TagVM } from '@shared/vm-types/tag-vm';

/**
 * TagList is a container component for displaying collections of Tag components.
 * It arranges tags in a horizontal layout with wrapping support.
 */
@Component({
  selector: 'app-tag-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Tag],
  template: `
    <div 
      class="flex flex-wrap gap-2"
      [attr.aria-label]="ariaLabel()"
    >
      @for (tag of tags(); track tag.name) {
        <app-tag [tag]="tag" />
      }
    </div>
  `,
})
export class TagList {
  /** Array of tags to display */
  readonly tags = input.required<readonly TagVM[]>();

  /** Computed aria-label for accessibility */
  protected readonly ariaLabel = computed(() => {
    return (
      'Tags: ' +
      this.tags()
        .map((tag) => tag.name)
        .join(', ')
    );
  });
}
